const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Debug: Log the API URL (remove this in production)
console.log('API_URL:', API_URL);

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    
    return response.json();
  },

  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }
    
    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    
    return response.json();
  },

  async checkJiraConnection(token: string) {
    // TODO: Implement when Jira OAuth is added
    return false;
  },

  // OAuth install URLs
  async getSlackInstallUrl(token: string) {
    const response = await fetch(`${API_URL}/slack/install`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get Slack install URL');
    }
    
    return response.json();
  },

  async getGmailInstallUrl(token: string) {
    const response = await fetch(`${API_URL}/gmail/gmail/install`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get Gmail install URL');
    }
    
    return response.json();
  },

  async getOutlookInstallUrl(token: string) {
    const response = await fetch(`${API_URL}/outlook/install`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get Outlook install URL');
    }
    
    return response.json();
  },

  async getJiraInstallUrl(token: string) {
    const response = await fetch(`${API_URL}/jira/install`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get Jira install URL');
    }
    
    return response.json();
  },

  // Connection status checks
  async checkSlackConnection(token: string) {
    const response = await fetch(`${API_URL}/slack/check-connection`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      return false;
    }
    
    return response.json();
  },

  async checkGmailConnection(token: string) {
    const response = await fetch(`${API_URL}/gmail/check-connection`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      return false;
    }
    
    return response.json();
  },

  async checkOutlookConnection(token: string) {
    const response = await fetch(`${API_URL}/outlook/check-connection`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      return false;
    }
    
    return response.json();
  },

  // Fetch messages and emails
  async getSlackChannels(token: string) {
    console.log('I am here');
    const response = await fetch(`${API_URL}/slack/conversations`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log(token);

    console.log(response);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Slack conversations');
    }
    
    return response.json();
  },

  async getSlackMessages(token: string, channelId: string) {
    const response = await fetch(`${API_URL}/slack/channels/${channelId}/messages`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Slack messages');
    }
    
    return response.json();
  },

  async getSlackConversations(token: string) {
    const response = await fetch(`${API_URL}/slack/conversations`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`Failed to fetch Slack conversations: ${response.status} ${errorText}`);
    }
    
    return response.json();
  },

  async getGmailEmails(token: string) {
    const response = await fetch(`${API_URL}/gmail/emails`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Gmail emails');
    }
    
    return response.json();
  }
}; 