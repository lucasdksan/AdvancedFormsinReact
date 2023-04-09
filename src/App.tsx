import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "./libs/supabase";
import { z } from "zod";

import "./styles/global.css";

const createUserFormSchema = z.object({
  name: z.string().nonempty("Digite seu nome completo").transform(name => {
    return name.trim().split(" ").map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(" ")
  }),
  email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido")
  .refine(email => { return email.endsWith("@gmail.com.br") }),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  techs: z.array(z.object({
    title: z.string().nonempty("O título é obrigatório"),
    knowledge: z.coerce.number().min(1).max(100)
  })).min(2, "Insira pelo menos 2 tecnologias"),
  avatar: z.instanceof(FileList).transform(list => list.item(0)!)
    .refine(file => file.size <= 5 * 1024 * 1024, "O arquivo precisa ter no máximo 5Mb."),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const [output, setOuput] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors
    }
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });
  const { fields, append, remove } = useFieldArray({
    name: "techs",
    control,
  });

  async function createUser(data: CreateUserFormData) {
    console.log(data.avatar)
    await supabase.storage.from("forms-react").upload(data.avatar?.name, data.avatar);

    setOuput(JSON.stringify(data, null, 2));
  }

  function handleAddNewTech() {
    append({ title: "", knowledge: 0 });
  }

  return (
    <main className="h-full bg-zinc-50 flex items-center justify-center flex-col gap-8">
      <form
        action=""
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("name")}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Email">E-mail</label>
          <input
            type="email"
            id="Email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("password")}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Avatar">Avatar</label>
          <input
            accept="image/*"
            type="file"
            id="Avatar"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("avatar")}
          />
          {errors.avatar && <span className="text-red-500 text-sm">{errors.avatar.message as string}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias

            <button
              type="button"
              className="text-emerald-600 text-sm"
              onClick={handleAddNewTech}
            >Adicionar Nova Tecnologia</button>
          </label>
          {
            fields.map((field, index) => {
              return (
                <>
                  <div className="flex gap-2" key={field.id}>
                    <input
                      type="text"
                      id="NameTech"
                      className="flex-1 border border-zinc-200 shadow-sm rounded h-10 px-3"
                      {...register(`techs.${index}.title`)}
                    />
                    <input
                      type="number"
                      id="numberTech"
                      className="border w-16 border-zinc-200 shadow-sm rounded h-10 px-3"
                      {...register(`techs.${index}.knowledge`)}
                    />
                  </div>
                  <span>
                    {errors.techs?.[index]?.title && <span className="text-red-500 text-sm">{errors.techs?.[index]?.title?.message as string}</span>} <br />
                    {errors.techs?.[index]?.knowledge && <span className="text-red-500 text-sm">{errors.techs?.[index]?.knowledge?.message as string}</span>}
                  </span>
                </>
              )
            })
          }
          {errors.techs && <span className="text-red-500 text-sm">{errors.techs.message as string}</span>}
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
