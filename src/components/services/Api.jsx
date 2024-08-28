import axios from "axios";
import { useRedirect } from "@/context/RedirectProvider";

// const API_URL = "http://squad-api.ddns.net/";
const API_URL = process.env.REACT_APP_API_DOMAIN_URL;

const axiosApi = axios.create({
  baseURL: API_URL + "api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      const redirect = useRedirect();
      redirect('/login');
      // window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

const setAuthToken = (token) => {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}

const login = async (userdata) => {
  try {
    const response = await axiosApi.post('/login', userdata);
    if (response.status === 200) {
      return { token: response.data.token, error: null };
    }
  } catch (error) {
    return { token: null, error: error.response.data.error }
  }
};

const logout = async () => {
  try {
    const response = await axiosApi.get('/logout');
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const register = async (formData) => {
  try {
    const response = await axiosApi.post('/register', formData);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
};

const fetchUserdata = async (userId = "") => {
  try {
    const query = userId != "" ? `/${userId}` : "";
    const response = await axiosApi.get(`/user${query}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchGroups = async ({ search = null, page = null } = {}) => {
  try {

    const endpoint = '/groups';
    let url;
    const params = {};

    // params setup
    if (search) params.search = search;
    if (page) params.page = page;

    // request
    const queryString = new URLSearchParams(params).toString();
    url = queryString ? `${endpoint}?${queryString}` : endpoint;
    const response = await axiosApi.get(url);

    if (response.status === 200) {
      return { data: response.data, error: null };
    }

  } catch (error) {
    return { data: null, error: error.response.data.error }
  }

}

const fetchGroup = async (groupId) => {
  try {
    const response = await axiosApi.get(`/groups/${groupId}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const handleJoinGroup = async (groupId, action) => {
  try {
    const response = await axiosApi.get(`/groups/${action}/${groupId}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const handleLeaveGroup = async (groupId) => {
  try {
    const response = await axiosApi.get(`/groups/leave/${groupId}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const handleDeleteGroup = async (groupId) => {
  try {
    const response = await axiosApi.delete(`/groups/${groupId}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const handleKickMember = async (groupId, memberId) => {
  try {
    const response = await axiosApi.get(`/groups/${groupId}/kick/${memberId}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchEnvironment = async () => {
  try {
    const response = await axiosApi.get('/environment');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchFacultades = async () => {
  try {
    const response = await axiosApi.get('/facultades');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchGroupRequests = async () => {
  try {
    const response = await axiosApi.get('/user/requests');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchNotifications = async () => {
  try {
    const response = await axiosApi.get('/user/notifications');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const handleJoinRequest = async (requestId, accept) => {
  try {
    const action = accept ? 'accept' : 'decline';
    const response = await axiosApi.get(`/user/requests/${requestId}/${action}`);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

const handleDeleteNotification = async (notificationId) => {
  try {
    let response = await axiosApi.get(`user/notifications/dismiss/${notificationId}`);
    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

const updateUserSettings = async (userdata) => {
  try {
    const response = await axiosApi.put('/user', userdata);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const updateUserAvatar = async (data) => {
  try {
    const response = await axiosApi.post('/user/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // onUploadProgress: (ProgressEvent) => {
      //   setUploadProgress(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total));
      // },
    });
    if (response.status === 200) {
      return true;;
    }
  } catch (error) {
    return false;
  }
}

const createGroup = async (formData) => {
  try {
    const response = await axiosApi.post('/groups', formData);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const sendFeedback = async (message) => {
  try {
    const response = await axiosApi.post('/feedback', message);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchJoinedGroups = async () => {
  try {
    const response = await axiosApi.get('/user/joined');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchOwnedGroups = async () => {
  try {
    const response = await axiosApi.get('/user/groups');
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchMessages = async (groupId) => {
  try {
    const response = await axiosApi.get(`/groups/${groupId}/messages`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const sendMessage = async (groupId, message) => {
  try {
    const response = await axiosApi.post(`/groups/${groupId}/messages`, { message: message });
    if (response.status === 201) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const fetchCarrerasType = async (type) => {
  try {
    const response = await axiosApi.get(`/carreras/${type}`);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

const editGroup = async (groupId, groupData) => {
  try {
    const response = await axiosApi.put(`/groups/${groupId}`, groupData);
    if (response.status === 200) {
      return { data: response.data, error: null };
    }
  } catch (error) {
    return { data: null, error: error.response.data.error }
  }
}

export const api = {
  API_URL,
  setAuthToken,
  login,
  logout,
  register,
  fetchUserdata,
  fetchGroups,
  fetchGroup,
  fetchEnvironment,
  fetchGroupRequests,
  fetchNotifications,
  fetchFacultades,
  fetchJoinedGroups,
  fetchOwnedGroups,
  handleJoinRequest,
  handleDeleteNotification,
  handleJoinGroup,
  handleLeaveGroup,
  handleDeleteGroup,
  handleKickMember,
  updateUserSettings,
  updateUserAvatar,
  createGroup,
  sendFeedback,
  fetchMessages,
  sendMessage,
  fetchCarrerasType,
  editGroup,
};