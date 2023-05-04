const GetDatafromApi = async (messages) => {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: messages }],
          temperature: 0.7,
        }),
      }
    );
    const responseData = await response.json();
    return responseData.choices[0].message;
  };
  
  export default GetDatafromApi;
  