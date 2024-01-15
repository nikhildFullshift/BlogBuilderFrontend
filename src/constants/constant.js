export const suggestionsData = [
  "Software Engineering",
  "IT",
  "React",
  "Java",
  "JavaScript",
  "TypeScript",
];
export const blogs = [
  {
    _index: "blog",
    _id: "5",
    _score: 1.2282143,
    _ignored: ["description.keyword"],
    _source: {
      author_id: 123,
      description:
        "## Table of Contents\n\n- [Introduction](#introduction)\n- [Understanding State](#understanding-state)\n- [State Management in React](#state-management-in-react)\n- [Code Snippet](#code-snippet)\n- [Conclusion](#conclusion)\n\n## Introduction\n\nState management is a crucial aspect of building applications in React. It refers to the management and manipulation of data within a component or across multiple components. In this article, we will explore the concept of state management in React and its importance.\n\n## Understanding State\n\nIn React, state is an object that represents the current state of a component. It holds data that can be updated and affects the rendering of the component. State allows components to be dynamic and interactive.\n\n## State Management in React\n\nReact provides various approaches for managing state. Some popular state management libraries in React ecosystem are Redux, MobX, and Context API.\n\nState management libraries help in organizing and managing the state of an application. They provide a centralized store where the state is stored and can be accessed by different components.\n\n## Code Snippet\n\n```javascript\n// add your code here\n```\n\nThe code snippet above represents a placeholder where you can add your own code related to state management in React. You can use any state management library or implement your own custom logic.\n\n## Conclusion\n\nState management is a crucial aspect of building complex applications in React. It allows components to be dynamic and interactive by managing and updating the state. By using state management libraries or implementing custom logic, developers can efficiently handle state in their React applications.",
      tags: ["Software Engineering", "AI", "Javascript"],
      is_deleted: false,
      published_to_kb_url: null,
      status: 4,
      title: "State Management in React",
      published_to_web_url: null,
      image: null,
      id: 5,
      created_at: "2023-11-30T06:45:33.205Z",
      published_at: "2023-12-12T08:03:32.155Z",
      meta_description: null,
      "@version": "1",
      updated_at: "2023-11-30T06:45:33.205Z",
      "@timestamp": "2023-12-14T10:38:00.935807300Z",
    },
  },
  {
    _index: "blog",
    _id: "1",
    _score: 1.0689585,
    _ignored: ["image.keyword", "description.keyword"],
    _source: {
      author_id: 123,
      description:
        "## Table of Contents\n\n1. Introduction\n2. What are React Hooks?\n3. Why use React Hooks?\n4. How to use React Hooks\n5. Examples of React Hooks\n6. Conclusion\n\n## 1. Introduction\n\nReact is a popular JavaScript library used for building user interfaces. It provides a component-based architecture that allows developers to create reusable UI components. In this article, we will explore React Hooks, a feature introduced in React 16.8.\n\n## 2. What are React Hooks?\n\nReact Hooks are functions that allow developers to use state and other React features in functional components. Before the introduction of Hooks, state management and lifecycle methods were only available in class components. With Hooks, developers can now use these features in functional components as well.\n\n## 3. Why use React Hooks?\n\nThere are several advantages of using React Hooks:\n\n- Hooks make it easier to reuse stateful logic between components.\n- They simplify the code by removing the need for class components.\n- Hooks provide a more intuitive way to work with state and side effects.\n\n## 4. How to use React Hooks\n\nTo use React Hooks, you need to import them from the 'react' package. There are several built-in Hooks available, such as useState, useEffect, useContext, etc. You can also create custom Hooks to encapsulate reusable logic.\n\nHere is an example of using the useState Hook:\n\n```javascript\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\n## 5. Examples of React Hooks\n\nThere are many use cases for React Hooks. Some common examples include:\n\n- Managing form state\n- Fetching data from an API\n- Handling authentication\n\n## 6. Conclusion\n\nReact Hooks provide a powerful way to manage state and other React features in functional components. They simplify the code and make it easier to reuse logic between components. By using Hooks, developers can write cleaner and more maintainable code.\n\nIn this article, we covered the basics of React Hooks and provided examples of how to use them. We also discussed the advantages of using Hooks and why they are beneficial for developers. Now you have a solid understanding of React Hooks and can start using them in your own projects.\n",
      tags: ["Software Engineering", "IT", "React"],
      is_deleted: false,
      published_to_kb_url: null,
      status: 4,
      title:
        "A Comprehensive Guide to React Hooks A Comprehensive Guide to React Hooks A Comprehensive Guide to React Hooks",
      published_to_web_url: null,
      image:
        "https://th.bing.com/th/id/R.7926965d1a9b2609d3615be20ac6b12f?rik=%2b7bgyWW1fRlwGw&riu=http%3a%2f%2fwww.andrefelizardo.com.br%2fblog%2fwp-content%2fuploads%2f2016%2f10%2freact.js.png&ehk=bJy%2byzfCQ2XlNdNHmGKO%2bu4SEWgCRUBWziI8scdMCVU%3d&risl=&pid=ImgRaw&r=0",
      id: 1,
      created_at: "2023-11-29T07:14:15.922Z",
      published_at: "2023-12-12T08:03:32.155Z",
      meta_description: null,
      "@version": "1",
      updated_at: "2023-12-13T08:03:32.155Z",
      "@timestamp": "2023-12-14T10:38:00.952570300Z",
    },
  },
  {
    _index: "blog",
    _id: "2",
    _score: 1.0689585,
    _ignored: ["image.keyword", "description.keyword"],
    _source: {
      author_id: 123,
      description:
        "## Table of Contents\n\n1. Introduction\n2. What are React Hooks?\n3. Benefits of Using React Hooks\n4. How to Use React Hooks\n5. Examples of React Hooks\n6. Conclusion\n\n## 1. Introduction\n\nIn this article, we will explore the concept of React Hooks and how they can enhance the development process for software teams.\n\n## 2. What are React Hooks?\n\nReact Hooks are a feature introduced in React 16.8 that allow developers to use state and other React features without writing a class. They provide a more concise and intuitive way to write reusable and modular code.\n\n## 3. Benefits of Using React Hooks\n\n- Simplified code structure\n- Improved code reusability\n- Enhanced readability\n- Easier testing\n\n## 4. How to Use React Hooks\n\nTo use React Hooks, you need to import them from the 'react' package. There are several built-in hooks available, such as useState, useEffect, and useContext.\n\n## 5. Examples of React Hooks\n\n### 5.1 useState\n\nThe useState hook allows you to add state to functional components. Here's an example:\n\n```javascript\nconst [count, setCount] = useState(0);\n``` \n\n### 5.2 useEffect\n\nThe useEffect hook is used to perform side effects in functional components. Here's an example:\n\n```javascript\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);\n```\n\n## 6. Conclusion\n\nReact Hooks provide a powerful way to write clean and efficient code in React applications. By leveraging hooks, software teams can improve their development process and create more maintainable and scalable applications.\n",
      tags: ["Software Engineering", "AI", "Javascript"],
      is_deleted: false,
      published_to_kb_url: null,
      status: 1,
      title: "A Comprehensive Guide to React Hooks",
      published_to_web_url: null,
      image:
        '"https://th.bing.com/th/id/R.7926965d1a9b2609d3615be20ac6b12f?rik=%2b7bgyWW1fRlwGw&riu=http%3a%2f%2fwww.andrefelizardo.com.br%2fblog%2fwp-content%2fuploads%2f2016%2f10%2freact.js.png&ehk=bJy%2byzfCQ2XlNdNHmGKO%2bu4SEWgCRUBWziI8scdMCVU%3d&risl=&pid=ImgRaw&r=0"',
      id: 2,
      created_at: "2023-11-29T07:19:42.376Z",
      published_at: null,
      meta_description: null,
      "@version": "1",
      updated_at: "2023-11-29T07:19:42.376Z",
      "@timestamp": "2023-12-14T10:38:00.924505300Z",
    },
  },
];
export const roles = [
  {
    role: "USER",
    userId: 121,
    label: "Soumen",
    name: "Soumen",
  },
  {
    role: "USER",
    userId: 124,
    label: "Jitender",
    name: "Jitender",
  },
  {
    role: "USER",
    userId: 125,
    label: "Varun",
    name: "Varun",
  },
  {
    role: "LEAD",
    userId: 123,
    label: "Lead1",
    name: "Lakin",
  },
  {
    role: "LEAD",
    userId: 126,
    label: "Lead2",
    name: "John Doe",
  },
  {
    role: "ADMIN",
    userId: 122,
    label: "Admin",
    name: "GPS Admin",
  },
];
export const languages = [
  {
    label: "Java",
    value: "java",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "TypeScript",
    value: "typescript",
  },
];
export const searchUrl = "/search";
export const blogUrl = "/blog/";
export const optionalUrl = "/optional/";
export const generateUrl = "/openai/generate";
export const versionUrl = "/version/";
export const annotationUrl = "/annotation/";
