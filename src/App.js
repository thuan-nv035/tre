import "./styles.css";
import { useEffect, useCallback, useRef } from "react";
export default function App() {
  const abc = useRef();
  const data = [
    {
      label: "thai",
      value: 1,
      children: [
        {
          label: "thuan",
          value: 1.2,
          children: []
        },
        {
          label: "tuan",
          value: 1.3,
          children: [
            {
              label: "hoang",
              value: 1.4,
              chilrdren: []
            }
          ]
        }
      ]
    },

    {
      label: "thang",
      value: 2,
      children: []
    }
  ];
  const getdata = useCallback((data, value) => {
    data.forEach((item) => {
      if (item.value === value) {
        abc.current = { ...item };
        return;
      }
      if (Array.isArray(item.children) && item.children.length) {
        getdata(item.children, value);
      }
    });

    return abc.current;
  }, []);

  useEffect(() => {
    const x = getdata(data, 1.2);
    // console.log(x);
  }, [getdata]);

  const getDataTree = (data, value) => {
    const getTree = (prev, curr) => {
      if (curr.value === value) {
        prev.push(curr);
        return prev;
      }

      if (Array.isArray(curr.children) && curr.children.length) {
        const nodes = curr.children.reduce(getTree, []);
        if (nodes.length) prev.push({ ...curr, ...nodes });
      }

      return prev;
    };
    return data.reduce(getTree, []);
  };

  const x = getDataTree(data, 1.4);
  console.log(x);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
