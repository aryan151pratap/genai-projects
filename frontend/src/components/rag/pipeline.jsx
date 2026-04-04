import {
  CiFolderOn,
  CiDatabase,
  CiSearch,
  CiViewList,
  CiText,
  CiChat1,
  CiSettings,
  CiCircleQuestion,
  CiStreamOn,
  CiSquareChevDown
} from "react-icons/ci";

const pipeline = [
  {
    name: "documents upload",
    icon: <CiFolderOn className="w-5 h-5" />,
    color: "yellow"
  },
  [
    {
      name: "text chunking",
      icon: <CiStreamOn className="w-5 h-5" />,
      color: "blue"
    },
    {
      name: "embeddings generation",
      icon: <CiSettings className="w-5 h-5" />,
      color: "purple"
    }
  ],
  [
    {
      name: "store in vector DB",
      icon: <CiDatabase className="w-5 h-5" />,
      color: "green"
    },
    {
      name: "query embedding",
      icon: <CiSettings className="w-5 h-5" />,
      color: "indigo"
    },
    {
      name: "user query",
      icon: <CiChat1 className="w-5 h-5" />,
      color: "pink"
    }
  ],
  [
    {
      name: "similarity search",
      icon: <CiSearch className="w-5 h-5" />,
      color: "orange"
    },
    {
      name: "retrieve context",
      icon: <CiViewList className="w-5 h-5" />,
      color: "cyan"
    }
  ],
  [
    {
      name: "prompt construction",
      icon: <CiText className="w-5 h-5" />,
      color: "rose"
    },
    {
      name: "LLM response",
      icon: <CiCircleQuestion className="w-5 h-5" />,
      color: "emerald"
    }
  ]
];

export default pipeline;