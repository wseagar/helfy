"use client";

import { useChat, useCompletion } from "ai/react";
import { useState } from "react";
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

const dietaryRequirements = [
  "vegan",
  "vegetarian",
  "gluten free",
  "dairy free",
  "nut free",
  "egg free",
  "soy free",
  "fish ree",
  "shellfish free",
  "pork free",
  "red meat free",
  "kosher",
  "halal",
  "low sodium",
  "low carb",
  "low fat",
  "low calorie",
  "paleo",
  "keto",
  "pescatarian",
];

async function saveRecipe(recipe: string) {
  const response = await fetch("/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markdown: recipe }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    setInput,
    setCompletion,
    complete,
  } = useCompletion({
    api: "/api/completion",
    onFinish(prompt, completion) {
      saveRecipe(completion);
    },
  });

  const [showDietaryRequirements, setShowDietaryRequirements] = useState(false);
  const [selectedDietaryRequirements, setSelectedDietaryRequirements] =
    useState<string[]>([]);

  const submitHandler = async (
    e?: React.FormEvent<HTMLFormElement>,
    isGenerateAnother = false
  ) => {
    e?.preventDefault();
    let prompt = input.trim();
    if (dietaryRequirements.length > 0) {
      prompt += "\nDIETRY REQUIREMENTS: \n";
      prompt += selectedDietaryRequirements.join("\n");
    }
    if (isGenerateAnother) {
      const previousRecipe = completion?.split("\n")?.[0];
      if (previousRecipe) {
        prompt += `\n\nDO NOT SUGGEST: ${previousRecipe}`;
      }
    }

    await complete(prompt);
  };

  return (
    <div className="bg-gray-900 text-white border border-gray-700 shadow-xl p-8 rounded-xl max-w-lg mx-auto mt-10">
      {!completion && (
        <>
          <h1 className="text-2xl font-bold mb-4">Helfy</h1>
          <p className="mb-4">
            Type in a recipe idea or your favorite ingredients, and Helfy&apos;s
            AI will whip up a fresh recipe with sustainability insights on
            command!
          </p>
          <form onSubmit={submitHandler} className="space-y-4">
            <textarea
              rows={3}
              value={input}
              placeholder="Enter your ingredients or meal idea here..."
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
            <div className="flex space-x-4 cursor-pointer justify-between">
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
              <a
                onClick={() => {
                  setInput("");
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Clear
              </a>
            </div>
            {/* Dietry restrictions */}
            <div className="flex space-x-4 cursor-pointer justify-between">
              <a
                onClick={() => {
                  setShowDietaryRequirements(!showDietaryRequirements);
                }}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                {showDietaryRequirements && (
                  <>Hide Dietary Requirements {/*upward arrow*/} &#x25B2;</>
                )}
                {!showDietaryRequirements && (
                  <>Add Dietary Requirements {/*downward arrow*/} &#x25BC;</>
                )}
              </a>
            </div>
            {showDietaryRequirements && (
              <div className="grid grid-cols-2 gap-4">
                {dietaryRequirements.map((dietaryRequirement) => (
                  <div key={dietaryRequirement} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={dietaryRequirement}
                      name={dietaryRequirement}
                      value={dietaryRequirement}
                      checked={selectedDietaryRequirements.includes(
                        dietaryRequirement
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDietaryRequirements((prev) => [
                            ...prev,
                            e.target.value,
                          ]);
                        }
                        if (!e.target.checked) {
                          setSelectedDietaryRequirements((prev) => {
                            const newDietaryRequirements = prev.filter(
                              (dietaryRequirement) =>
                                dietaryRequirement !== e.target.value
                            );
                            return newDietaryRequirements;
                          });
                        }
                      }}
                    />
                    <label htmlFor={dietaryRequirement}>
                      {dietaryRequirement}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </form>
        </>
      )}
      {completion && (
        <>
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold">Helfy</h1>
            <button
              onClick={() => {
                stop();
                setInput("");
                setCompletion("");
              }}
              className="text-blue-400 hover:text-blue-300 focus:outline-none"
            >
              Back
            </button>
          </div>

          <ReactMarkdown
            className="prose prose-invert break-words prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {completion}
          </ReactMarkdown>
          {!isLoading && (
            <div className="flex justify-start space-x-4 mt-2">
              <button
                type="button"
                onClick={() => submitHandler(undefined, true)}
                className="py-2 flex-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none"
              >
                Generate another
              </button>
            </div>
          )}
          {/* <div className="flex justify-start space-x-4">
            {isLoading && (
              <button
                type="button"
                onClick={stop}
                className="py-2 flex-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
              >
                Stop
              </button>
            )}
          </div> */}
        </>
      )}
    </div>
  );
}
