import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./styles/global.css";

const createUserFormSchema = z.object({
  email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
});

function App() {
  const [ output, setOuput ] = useState("");
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(createUserFormSchema)
  });

  function createUser(data: any){
    setOuput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-50 flex items-center justify-center flex-col gap-8">
      <form 
        action="" 
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="Email">E-mail</label>
          <input 
            type="email" 
            id="Email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            { ...register("email") }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password" 
            className="border border-zinc-200 shadow-sm rounded h-10"
            { ...register("password") }
          />
        </div>

        <button 
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          type="submit"
        >Salvar</button>
      </form>
      <pre>
        {output}
      </pre>
    </main>
  )
}

export default App;
