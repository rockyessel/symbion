export const content = [
  {
    nodeType: 'block',
    type: 'column-layout',
    columns: 2,
    children: [
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: "Persisting data in Next.js using localStorage is very frustrating, and I have read many posts where other developers use other libraries or cookies to accomplish the same effect as localStorage .\r\n\r\nIn my use case, I needed the localStorage to store the user preference without creating a modal to store the user's preference and making API requests to POST and GET, whenever the user is on the website when I could use localStorage.\r\n\r\nSo, to use and persist data in Next.js, we are not doing it the normal way.\r\n\r\nSo let's start,\r\n\r\n",
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'code-block',
        language: 'bash',
        children: [
          {
            text: 'npx create-next-app@latest next_localstorage',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: "\r\nTo install TypeScript, once you run the above command in your terminal, you have options to choose, TypeScript, and EsLint.\r\n\r\nThen install tailwindCSS, here\r\n\r\nSo what are we creating?\r\n\r\nWe'll be creating a drop dropdown menu, do we can store whatever option the user selects in our localStorage, and will be the same after the page refreshes.\r\n\r\n",
          },
          {
            text: '/pages/index.ts',
            code: true,
          },
          {
            text: '\r\n\r',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'code-block',
        language: 'jsx',
        children: [
          {
            text: "import React from 'react';\r\n\r\nconst Home = () => {\r\n  const [selected, setSelected] = React.useState('red');\r\n  const [selectedState, setSelectedState] = React.useState(false);\r\n\r\n  return (\r\n    <main className='bg-slate-900 text-white w-full h-screen p-10'>\r\n      <button\r\n        onClick={() => setSelectedState((prev) => !prev)}\r\n        className='relative px-4 py-4 rounded-md text-black font-semibold bg-gray-400'\r\n      >\r\n        Select Your Code\r\n        {selectedState && (\r\n          <ul className='bg-[#3d3d3d] text-[1rem] text-white w-[10rem] z-[1] drop-shadow-lg absolute top-12 left-0 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>\r\n            <li onClick={() => setSelected('red')} className='w-full py-2'>\r\n              Red\r\n            </li>\r\n            <li onClick={() => setSelected('blue')} className='w-full py-2'>\r\n              Blue\r\n            </li>\r\n            <li onClick={() => setSelected('yellow')} className='w-full py-2'>\r\n              Yellow\r\n            </li>\r\n            <li onClick={() => setSelected('gray')} className='w-full py-2'>\r\n              Gray\r\n            </li>\r\n            <li onClick={() => setSelected('green')} className='w-full py-2'>\r\n              Green\r\n            </li>\r\n          </ul>\r\n        )}\r\n      </button>\r\n\r\n      <p>This is the color you picked: {selected}</p>\r\n      <div\r\n        className={`w-64 h-32 rounded-md`}\r\n        style={{ backgroundColor: `${selected}` }}\r\n      ></div>\r\n    </main>\r\n  );\r\n};\nexport default Home;",
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '\r\n\r\r\nSo with the ',
          },
          {
            text: "const [selected, setSelected] =React.useState('red')",
            code: true,
          },
          {
            text: ' what this state does is change the default value for ',
          },
          {
            text: 'red',
            code: true,
          },
          {
            text: " to any colour of the user's choosing. Then we use the ",
          },
          {
            text: 'selected',
            code: true,
          },
          {
            text: ' value to change the background colour of the box we created. And of course we used Tailwind for the styling, to learn more about this amazing CSS framework, this is tutorial out.\r\n\r\nSo it get into using localStorage with nextjs\r\n\r\nGenerally problem is that, when you use a hook, to keep track of a value, after refresh then it goes to it normal state. So in order to ecaspe that, we have to create a certain logic, then we can you localStorage without getting any error. So here is the modification to the ',
          },
          {
            text: "const [selected, setSelected] =React.useState('red')",
            code: true,
          },
          {
            text: '\r\n\r\nBut first let set localStorage in ',
          },
          {
            text: 'useEffect()',
            code: true,
          },
          {
            text: ' hook\r\n\r',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'code-block',
        language: 'jsx',
        children: [
          {
            text: "React.useEffect(()=>{\r\n    window.localStorage.setItem('user_selected_colour', selected)\r\n  },[selected])\r\nThen for the selected State.\r\n\r\nconst [selected, setSelected] = React.useState(():string =>{\r\n    if (typeof window !== 'undefined'){\r\n      const from_localStorage = window.localStorage.getItem('user_selected_colour')\r\n      if (from_localStorage === null || from_localStorage === undefined){\r\n        return 'Red'\r\n      }\r\n\r\n      return `${from_localStorage}` ? from_localStorage : 'Red'\r\n    }\r\n    return ''\r\n  });",
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: "\r\nNow with this, we can now persist our data, and wouldn't have to rely on any thrid-parties apart from our browser localStorage. So let me explain it.\r\n\r\nSo first, we want to make sure that window is defined, and if it is, then we get the item from our localStorage then store it into ",
          },
          {
            text: 'from_localStorage',
            code: true,
          },
          {
            text: '. Please listen hear, so if the user, opens the web app for the first time, nothing is save to localStorage, so by default, we get ',
          },
          {
            text: 'undefined',
            code: true,
          },
          {
            text: ' or ',
          },
          {
            text: 'null',
            code: true,
          },
          {
            text: ', so in the next line of code, we are checking if the ',
          },
          {
            text: 'from_localStorage',
            code: true,
          },
          {
            text: ' return ',
          },
          {
            text: 'null',
            code: true,
          },
          {
            text: ' or ',
          },
          {
            text: 'undefined',
            code: true,
          },
          {
            text: ' which will for only one time(when the user opens the web for the first time), then we set it to our default value that we want, and in this case, it is ',
          },
          {
            text: 'red',
            code: true,
          },
          {
            text: ', and once we do that, then ',
          },
          {
            text: 'from_localStorage',
            code: true,
          },
          {
            text: ' is not ',
          },
          {
            text: 'null',
            code: true,
          },
          {
            text: ' or ',
          },
          {
            text: 'undefined',
            code: true,
          },
          {
            text: ', so if the user should choose another option like ',
          },
          {
            text: 'blue',
            code: true,
          },
          {
            text: ', then ',
          },
          {
            text: 'from_localStorage',
            code: true,
          },
          {
            text: ' is defined, so we move to the next line which is: ',
          },
          {
            text: "return`${from_localStorage}`?from_localStorage:'red'",
            code: true,
          },
          {
            text: ', all we are saying is that, if a value exist, then return that value or else return ',
          },
          {
            text: 'red',
            code: true,
          },
          {
            text: '.\r\n\r\nBut there is a problem with this, mind you the localStorage is working perfectly, then you will get a react-hydration, something like this:',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '\r\n\r\n',
          },
        ],
      },
      {
        nodeType: 'void',
        type: 'image',
        props: {
          src: 'https://cdn.sanity.io/images/40to7ztv/production/a79875818dceae71bfbedd4f22cf1bf02a907ba2-966x755.png',
          alt: 'sas',
          height: 400,
          width: 400,
        },
        children: [
          {
            text: 'No caption provided',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '\r\nThe reason we are getting this error, is that HTML that is rendered in the server-side, and which is ',
          },
          {
            text: 'red',
            code: true,
          },
          {
            text: ', changes after the user select their option, and might maybe refresh the page, casing the client-side, show ',
          },
          {
            text: 'blue',
            code: true,
          },
          {
            text: ' which the user chose, and because the server-side expect ',
          },
          {
            text: 'red',
            code: true,
          },
          {
            text: ' but got ',
          },
          {
            text: 'blue ',
            code: true,
          },
          {
            text: 'instead, that why we are getting this hydration error, so to solve this problem we introduce another ',
          },
          {
            text: 'useState',
            code: true,
          },
          {
            text: ' hook, and what it does, is to store every selected option by the user, and updates the state then display it.\r\n\r\nSo you will definitely understand after the code:\r\n\r',
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'code-block',
        language: 'jsx',
        children: [
          {
            text: "const [local] = React.useState(():string =>{\r\n    if (typeof window !== 'undefined'){\r\n      const from_localStorage = window.localStorage.getItem('user_selected_colour')\r\n      if (from_localStorage === null || from_localStorage === undefined){\r\n        return 'red'\r\n      }\r\n\r\n      return `${from_localStorage}` ? from_localStorage : 'red'\r\n    }\r\n    return ''\r\n  });\r\n  const [selected, setSelected] = React.useState<string>(local);\r\n  const [selectedOption, setSelectedOption] = React.useState<string>();\r\n  const [selectedState, setSelectedState] = React.useState(false);\r\n\r\n\r\n  React.useEffect(()=>{\r\n    window.localStorage.setItem('user_selected_colour', `${selected}`)\r\n\r\n    setSelectedOption(`${selected}`);\r\n  },[local, selected])",
          },
        ],
      },
      {
        nodeType: 'block',
        type: 'paragraph',
        children: [
          {
            text: '\r\nConclusion\r\nNow I hope you now know how to persist data in Next.js. For the source code for this project see and here is a live demo',
          },
        ],
      },
    ],
  },
];
