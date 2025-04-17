export const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "2025-04-14",
    excerpt:
      "Learn the basics of React and how to set up your first React application.",
    content: `
# Getting Started with React

React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile apps.

## Installation

To start a new React project, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## React Components

Components are the building blocks of any React application. A component is a JavaScript class or function that optionally accepts inputs and returns a React element that describes how a section of the UI should appear.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

You can then use this component in your application:

\`\`\`jsx
<Welcome name="User" />
\`\`\`

## JSX

JSX is a syntax extension for JavaScript that looks similar to HTML. It's recommended to use with React to describe what the UI should look like.

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

## State and Lifecycle

React components can have state and lifecycle methods that allow you to perform actions at specific points in a component's lifecycle.

\`\`\`jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
\`\`\`

## Hooks

Hooks are a newer addition to React that let you use state and other React features without writing a class.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`,
  },
  {
    id: 2,
    title: "Understanding Markdown",
    date: "2025-04-15",
    excerpt:
      "Learn how to write effective documentation using Markdown syntax.",
    content: `
# Understanding Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## Basic Syntax

### Headings

To create a heading, add number signs (#) in front of a word or phrase.

# Heading 1
## Heading 2
### Heading 3

### Bold and Italic

To bold text, add two asterisks or underscores before and after a word or phrase.

**Bold text**
__Bold text__

To italicize text, add one asterisk or underscore before and after a word or phrase.

*Italicized text*
_Italicized text_

### Lists

To create an ordered list, add line items with numbers followed by periods.

1. First item
2. Second item
3. Third item

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items.

- First item
- Second item
- Third item

### Links

To create a link, enclose the link text in brackets and then follow it immediately with the URL in parentheses.

[title](https://www.example.com)

### Images

To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses.

![alt text](image.jpg)

### Code

To denote a word or phrase as code, enclose it in backticks (\`).

\`code\`

To create a code block, use three backticks (\`\`\`) before and after the code block.

\`\`\`
function test() {
  console.log("This is a code block");
}
\`\`\`

### Blockquotes

To create a blockquote, add a > in front of a paragraph.

> This is a blockquote

## Extended Syntax

### Tables

To add a table, use three or more hyphens (---) to create each column's header, and use pipes (|) to separate each column.

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Footnotes

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Strikethrough

~~The world is flat.~~

### Task Lists

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
`,
  },
  {
    id: 3,
    title: "Tailwind CSS Basics",
    date: "2025-04-16",
    excerpt:
      "Learn how to use Tailwind CSS to quickly build beautiful interfaces.",
    content: `
# Tailwind CSS Basics

Tailwind CSS is a utility-first CSS framework packed with classes like \`flex\`, \`pt-4\`, \`text-center\` and \`rotate-90\` that can be composed to build any design, directly in your markup.

## Getting Started

### Installation

Install Tailwind CSS via npm:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
\`\`\`

### Configuration

Create a \`tailwind.config.js\` file:

\`\`\`javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

### Add the Tailwind directives to your CSS

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Basic Usage

### Typography

\`\`\`html
<h1 class="text-3xl font-bold">Heading 1</h1>
<p class="text-gray-700">This is a paragraph.</p>
\`\`\`

### Colors

\`\`\`html
<div class="bg-blue-500 text-white">Blue background with white text</div>
<div class="bg-red-500 text-white">Red background with white text</div>
\`\`\`

### Spacing

\`\`\`html
<div class="p-4 m-2">Padding and margin</div>
<div class="pt-4 mb-2">Padding top and margin bottom</div>
\`\`\`

### Flexbox

\`\`\`html
<div class="flex flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
\`\`\`

### Grid

\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
\`\`\`

### Responsive Design

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  This text changes size on different screen sizes
</div>
\`\`\`

## Customization

You can customize Tailwind by modifying your \`tailwind.config.js\` file.

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#243c5a',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}
\`\`\`
`,
  },
];

export default blogPosts;
