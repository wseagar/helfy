"use client";

import { useChat, useCompletion } from "ai/react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const randomIngrediants = [
  "flour",
  "sugar",
  "salt",
  "pepper",
  "butter",
  "milk",
  "eggs",
  "chicken",
  "beef",
  "pork",
  "cheese",
  "tomato",
  "onion",
  "garlic",
  "potato",
  "carrot",
  "broccoli",
  "rice",
  "pasta",
  "bread",
  "lettuce",
  "spinach",
  "apple",
  "banana",
  "orange",
  "lemon",
  "lime",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "peach",
  "pear",
  "pineapple",
  "mango",
  "watermelon",
  "grapes",
  "corn",
  "peas",
  "green beans",
  "avocado",
  "olive oil",
  "vegetable oil",
  "chocolate",
  "honey",
  "syrup",
  "jam",
  "jelly",
  "peanut butter",
  "almond butter",
  "cashew butter",
  "walnut butter",
  "pecan butter",
  "hazelnut butter",
  "macadamia butter",
  "pistachio butter",
  "sunflower butter",
  "sesame butter",
  "soy butter",
  "tofu",
  "tempeh",
  "seitan",
  "miso",
  "soy sauce",
  "tamari",
  "fish sauce",
  "oyster sauce",
];

export function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="bg-gray-900 text-white border border-gray-700 shadow-xl p-8 rounded-xl max-w-lg mx-auto mt-10">
      {!completion && (
        <>
          <h1 className="text-2xl font-bold mb-4">Helfy</h1>
          <p className="mb-4">
            Type in any food you have in your fridge or pantry and our low
            carbon bot will serve you up a recipe right away.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows={3}
              value={input}
              placeholder="Enter your ingredients here..."
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 rounded-md placeholder-gray-300 focus:outline-none focus:border-blue-400 bg-gray-800 text-white"
            />

            <div className="flex justify-start space-x-4">
              <button
                disabled={isLoading}
                type="submit"
                className={`py-2 px-4 bg-blue-500 text-white rounded-md flex-[3] ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-400"
                } focus:outline-none`}
              >
                Submit
              </button>
            </div>
            <div className="flex justify-start space-x-4">
              <a
                onClick={() => {
                  const ingredients = [];
                  for (let i = 0; i < 3; i++) {
                    ingredients.push(
                      randomIngrediants[
                        Math.floor(Math.random() * randomIngrediants.length)
                      ]
                    );
                  }
                  setInput(ingredients.join("\n"));
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Surprise me
              </a>
            </div>
          </form>
        </>
      )}
      {completion && (
        <>
          {!isLoading && (
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
              <h1 className="text-2xl font-bold">Helfy</h1>
              <button
                onClick={() => {
                  setInput("");
                  setCompletion("");
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Back
              </button>
            </div>
          )}
          <ReactMarkdown
            className="prose prose-invert break-words prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {completion}
          </ReactMarkdown>
          <div className="flex justify-start space-x-4">
            {isLoading && (
              <button
                type="button"
                onClick={stop}
                className="py-2 flex-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
              >
                Stop
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
