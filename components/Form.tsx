function Dashboard(props: any) {
  return (
    <div className="flex h-screen flex-col items-center mx-auto justify-center space-y-5">
      <div
        className="flex flex-col items-center space-y-5 bg-[#ffff64]  rounded-lg shadow-md shadow-[#ffff64]  px-10 py-10 w-80

      "
      >
        <div className="text-2xl font-bold pb-5">
          <h1>Worlder | {props.type}</h1>
        </div>

        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400  "
          type="email"
          placeholder="Email..."
          autoComplete="off"
          value={props.emailValue}
          onChange={props.handleEmailChange}
        ></input>

        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 "
          type="password"
          placeholder="Password..."
          autoComplete="off"
          value={props.passwordValue}
          onChange={props.handlePasswordChange}
        />

        <button
          onClick={props.handleActionOne}
          className="px-5 py-2 ring-1 ring-black bg-white rounded-lg text-black hover:bg-black hover:text-white w-48"
        >
          {props.actionOne}
        </button>
        <div>{props.error}</div>
      </div>
      <div className="flex space-x-3 items-center">
        <h1 className="text-lg text-white">{props.condition}</h1>
        <button
          onClick={props.handleActionTwo}
          className="px-2 py-2  bg-white rounded-lg text-black hover:bg-[#ffff64] hover:text-black"
        >
          {props.actionTwo}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
