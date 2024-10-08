import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Square, ChevronLeft, SendHorizontal } from "lucide-react";

import { api } from "@/components/services/Api";
import { useGlobalContext } from "@/context/GlobalProvider";
import { trimString } from "@/components/services/Utils";
import MessageBubble from "@/components/MessageBubble";
import useInterval from "@/hooks/useInterval";
import ButtonLoader from "@/components/ButtonLoader";

const GroupChatPage = ({ }) => {
  const { groupId } = useParams();
  const { isLoggedIn } = useGlobalContext();

  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState(null);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchGroup = async () => {
    const { data, error } = await api.fetchGroup(groupId);
    if (data) {
      setGroup(data);
    } else {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await api.fetchMessages(groupId);
    if (data) {
      setMessages(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroup();
    fetchMessages();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    setIsSending(true);
    const { data, error } = await api.sendMessage(groupId, text);
    if (data) {
      setMessages((prev) => [...prev, data]);
    }
    setText('');
    setIsSending(false);
  }

  useInterval(() => {
    fetchMessages();
  }, 15000);

  if (!isLoggedIn) return (<Navigate to="/login" />);

  return (
    <>

      <div className="fixed top-0 bg-black w-full h-16 px-4 flex flex-row items-center gap-4 shadow-lg">
        <Link to={`/group/${groupId}`} className="active:brightness-75">
          <ChevronLeft size="32" color="#fff" />
        </Link>
        <label className="font-satoshi-medium text-white text-xl">{trimString(group?.title, 32)}</label>
      </div>

      <div className="w-full h-full flex flex-col justify-start px-2 py-4 gap-2 bg-gray-100 h-screen" >

        <div className="h-16" />

        {messages?.map((message, idx) => (
          <MessageBubble message={message} key={idx} />
        ))}

        <div className="h-24" ref={bottomRef} />

      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300">
        
        <div className="flex flex-row gap-3 pb-4">

          <input
            type="text"
            placeholder="Escribe un mensaje"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <ButtonLoader
            onClick={handleSendMessage}
            className="max-w-12"
            isLoading={isSending}
          >
            <SendHorizontal />
          </ButtonLoader>
        </div>
      </div>

    </>
  );
};

export default GroupChatPage;
