import http from './';

const servicesHandler = fn => params => Promise.resolve(fn(params)).catch(err => { return err.response.data });

// @desc    Send verification email for new user
// @access  Public
export const register = servicesHandler(async user => {
    const { data } = await http.post('/auth/register', {
       name: user.name, 
       username: user.username, 
       email: user.email, 
       password: user.password, 
    });

    return data;
});
  
// @desc    Verifify new user account
// @access  Public
export const accountVerification = servicesHandler(async (params) => {
    const { data } = await http.put(`/auth/accountverification/${params.token}`, {
        email: params.email
    });
    
    // Set Authorization header
    http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    return data;
});

// @desc    
// @access  Public
export const resendToken = servicesHandler(async (email) => {
    const { data } = await http.put(`/auth/resendtoken`, { email });
    
    return data;
});
  
// @desc    Login user
// @access  Public
export const login = servicesHandler(async user => {
    const { data } = await http.post('/auth/login', {
        email: user.email,
        password: user.password
    });

    // Set Authorization header
    http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    return data;
});

export const getMe = servicesHandler(async () => {
    const { data } = await http.get('/auth/me');

    return data;
});

// @desc    Refresh access token
// @access  Private
export const getAccessToken = servicesHandler(async () => {
    const { data } = await http.post('/auth/refresh');

    // Set Authorization header
    http.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    return data;
});

// @desc    Logout user
// @access  private
export const logout = servicesHandler(async () => {
    const { data } = await http.get('/auth/logout');

    return data;
});