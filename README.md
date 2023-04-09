# 💻 AdvancedFormsinReact 📝

## Descrição:

Um dos pontos importantes que um desenvolvedor front-end deve implementar são os formulários e todos os esquemas de validação. Dito isto, este projeto é o resultado de estudos sobre este tema juntamente com o vídeo da <a href="https://www.youtube.com/watch?v=XSbMSSdGSdg">Rocktseat</a>.

Para esse processo de validação forão selecionados as libs zod, react-hook-form e @hookform/resolvers.

## Explicações: 

Zod é uma biblioteca de declaração e validação de esquema TypeScript-first. O termo esquema vem pelo motivo para se referir amplamente a qualquer tipo de dados, de um stringobjeto aninhado simples a um complexo.

O Zod foi projetado para ser o mais amigável possível ao desenvolvedor. O objetivo é eliminar declarações de tipo duplicadas. Com Zod, e possível declarar um validador uma vez e Zod inferirá automaticamente o tipo estático de TypeScript. É fácil compor tipos mais simples em estruturas de dados complexas.

* Zero dependências
* Funciona em Node.js e em todos os navegadores modernos
* Tiny: 8kb minificado + compactado
* Imutável: métodos (por exemplo .optional()) retornam uma nova instância
* Interface concisa e encadeável
* Abordagem funcional: analise, não valide
* Funciona com JavaScript simples também! Você não precisa usar TypeScript.

O React Hook Form facilita a validação de formulários, alinhando-se com o padrão HTML existente para validação de formulários .

Lista de regras de validação suportadas:

* obrigatório
* min
* máximo
* minLength
* comprimento máximo
* padrão
* validar

Você pode ler mais detalhes sobre cada regra na seção de registro.

@hookform/resolvers é uma lib que permite você use qualquer biblioteca de validação externa, como Yup , Zod , Joi , Vest , Ajv e muitas outras. O objetivo é garantir que você possa integrar perfeitamente qualquer biblioteca de validação de sua preferência. Se você não estiver usando uma biblioteca, sempre poderá escrever sua própria lógica para validar seus formulários.

