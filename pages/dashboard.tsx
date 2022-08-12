import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Incomplete } from "../typings";
import { TrashIcon } from "@heroicons/react/outline";
import Header from "../components/Header";
import { XCircleIcon } from "@heroicons/react/solid";

function Dashboard() {
  const [todo, setTodo] = useState("");
  const [userTodos, setUserTodos] = useState<any>([]);
  const [searchTodos, setSearchTodos] = useState<any>("");
  const router = useRouter();
  const [currentUser, currentUserLoading, currentUserError] =
    useAuthState(auth);

  const [retrievedTodo, retrievedLoading, retreivedError] = useCollection(
    query(collection(db, `users/${currentUser?.uid}/todos`))
  );

  useEffect(() => {
    const incomplete: Incomplete[] = [];
    retrievedTodo?.forEach((todo) => {
      let obj: any = { ...todo.data(), id: todo.id };
      incomplete.push(obj);
    });

    incomplete.sort(
      (a, b) =>
        parseFloat(b.createdAt.toMillis()) - parseFloat(a.createdAt.toMillis())
    );

    setUserTodos(incomplete);
  }, [retrievedTodo]);

  useEffect(() => {
    const arrayToFilter: any[] = [];
    retrievedTodo?.forEach((todo: any) => {
      let obj = { ...todo.data(), id: todo.id };
      arrayToFilter.push(obj);
    });

    arrayToFilter.sort(
      (a, b) =>
        parseFloat(b.createdAt.toMillis()) - parseFloat(a.createdAt.toMillis())
    );

    const filtered = arrayToFilter.filter((todo: any) => {
      return todo.title.toLowerCase().includes(searchTodos);
    });

    setUserTodos(filtered);
  }, [retrievedTodo, searchTodos]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const handleClick = (event: any) => {
    if (event.target.style.textDecoration) {
      event.target.style.removeProperty("text-decoration");
      event.target.style.removeProperty("background-color");
      event.target.style.removeProperty("color");
    } else {
      event.target.style.setProperty("text-decoration", "line-through");
      event.target.style.setProperty("background-color", "lightgreen");
      event.target.style.setProperty("color", "black");
    }
  };

  if (!retrievedLoading && !currentUserLoading) {
    return (
      <div className="flex h-screen flex-col content-start items-center space-y-5 bg-black pb-10">
        <div className="flex w-full items-center">
          <Header />
        </div>
        <div className="flex flex-col max-h-screen items-center space-y-5 bg-slate-300  rounded-lg shadow-2xl shadow-slate-800 px-10 py-10 w-80 content-start overflow-y-scroll overflow-x- scrollbar-thin scrollbar-thumb-yellow-100">
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border text-black border-slate-300 rounded-md text-sm shadow-sm placeholder-black ring-1 ring-black"
            type="text"
            placeholder="Add Todo.."
            autoComplete="off"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            onKeyUp={async (e) => {
              if (e.key === "Enter" && todo !== "") {
                setTodo("");
                await addDoc(
                  collection(db, `users/${currentUser?.uid}/todos`),
                  {
                    title: todo,
                    deleted: false,
                    done: false,
                    createdAt: new Date(),
                  }
                );
              }
            }}
          ></input>
          <div className="flex items-center space-x-5 w-full">
            <input
              className="mt-1 block flex-1 px-3 py-2 bg-white border text-black border-slate-300 rounded-md text-sm shadow-sm  placeholder-black ring-1 ring-black"
              type="text"
              placeholder="Search Todo.."
              autoComplete="off"
              value={searchTodos}
              onChange={(e) => {
                setSearchTodos(e.target.value);
              }}
            />
            {!!searchTodos && (
              <XCircleIcon
                onClick={() => {
                  setSearchTodos("");
                }}
                className="w-9 h-9 cursor-pointer hover:scale-105 hover:text-red-600"
              />
            )}
          </div>

          {userTodos?.map((todo: any) => (
            <div className="flex items-center space-x-2" key={todo.id}>
              <div
                onClick={handleClick}
                className="todo mt-1  block w-48 px-3 py-2 bg-slate-500 text-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 cursor-pointer break-words hover:scale-105 "
              >
                {todo.title}
              </div>
              <div>
                <TrashIcon
                  onClick={async () => {
                    await deleteDoc(
                      doc(db, `users/${currentUser?.uid}/todos`, todo.id)
                    );
                  }}
                  className="w-6 h-6 cursor-pointer  hover: rounded-full hover:text-red-600 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* <Footer /> */}
      </div>
    );
  } else {
    return (
      <div className="flex h-screen bg-black">
        <p className="m-auto text-white">Loading...</p>
      </div>
    );
  }
}

export default Dashboard;
