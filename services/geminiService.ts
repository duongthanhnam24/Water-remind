import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getHydrationAdvice = async (
  currentAmount: number,
  goalAmount: number,
  userName: string
): Promise<string> => {
  try {
    const ai = getClient();
    const percentage = Math.round((currentAmount / goalAmount) * 100);
    
    // Provide advice based on time of day and progress
    const hour = new Date().getHours();
    let timeContext = "buổi sáng";
    if (hour >= 12 && hour < 18) timeContext = "buổi chiều";
    if (hour >= 18) timeContext = "buổi tối";

    const prompt = `
      Bạn là một huấn luyện viên sức khỏe cá nhân thân thiện.
      Người dùng tên là ${userName}. 
      Hiện tại là ${timeContext}.
      Họ đã uống ${currentAmount}ml nước hôm nay, đạt ${percentage}% mục tiêu (${goalAmount}ml).
      
      Hãy đưa ra một lời khuyên ngắn gọn (dưới 30 từ), vui vẻ và khích lệ bằng tiếng Việt để nhắc họ uống nước hoặc khen ngợi họ.
      Đừng lặp lại các con số thống kê, chỉ đưa ra lời khuyên hoặc sự thật thú vị về nước.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Hãy nhớ uống nước đều đặn để cơ thể khỏe mạnh!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nước là sự sống! Hãy uống thêm một ngụm nhé.";
  }
};
