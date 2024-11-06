// Basic email format validation using regex
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Function to validate email with Hunter API (optional, for more advanced checks)
 
  
  export const validateEmailWithHunter = async (email: string): Promise<boolean> => {
    const apiKey = 'your-api-key'; // Replace with your actual Hunter.io API key
    const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.result === 'deliverable') {
        return true; // Email is deliverable
      } else {
        return false; // Email is not deliverable
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      return false; // Default to false if there's an error
    }
  };
  