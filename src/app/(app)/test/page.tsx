"use client";

import { generateResponse } from "@/utils/chatgpt";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    const response = await generateResponse(input);
    console.log(response);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
}
