/**
 * Dados mockados do site — Desiree Honório
 * Centralize aqui todos os textos, listas de serviços, depoimentos e galeria.
 * TODO: Substituir textos e imagens por conteúdo real antes de publicar.
 */

// ─── Serviços ────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    slug: "design-sobrancelhas",
    icon: "eyebrow",
    title: "Brow lamination e Design de Sobrancelhas",
    shortDescription:
      "Modelagem personalizada para realçar e harmonizar o seu olhar conforme o formato do seu rosto.",
    description:
      "Cada rosto é único, e as sobrancelhas são o moldura do olhar. Utilizo técnicas precisas de mapeamento facial para criar um design exclusivo que realça sua beleza natural. O procedimento inclui análise de formato de rosto, higienização, modelagem e finalização.",
    duration: "45 min – 1h",
    
    image:
      "/gallery-servicos/sobre3.jpg",
    category: "sobrancelha",
    features: [
      "Mapeamento facial personalizado",
      "Higienização completa",
      "Modelagem por fios ou cera",
      "Coloração opcional",
    ],
  },
  {
    id: 2,
    slug: "metodo-revitalize",
    icon: "revitalize",
    title: "Método RevitalizeBrow",
    shortDescription:
      "Remoção + reparo tecidual + reconstrução de pelos em um protocolo 3 em 1, reconhecido como um dos procedimentos mais procurados do estúdio.",
    description:
      "O Método Revitalize foi desenvolvido para reconstruir e revitalizar sobrancelhas com segurança. Considerado um dos tratamentos de maior destaque no estúdio, o protocolo combina diagnóstico personalizado, remoção segura de pigmentos antigos, reparo tecidual e reconstrução estratégica para devolver harmonia facial e autoestima.",
    duration: "Etapas personalizadas",
    image:
      "/gallery-my/revitalize.jpg",
    category: "sobrancelha",
    features: [
      "Diagnóstico personalizado",
      "Remoção segura de pigmentação antiga",
      "Reparo tecidual e regeneração da pele",
      "Reconstrução estratégica e natural",
    ],
  },
  {
    id: 3,
    slug: "micropigmentacao-sobrancelha",
    icon: "nano",
    title: "Nanopigmentação de Sobrancelhas",
    shortDescription:
      "Técnica de nanofios hiper-realistas com design estratégico e individual para cada cliente.",
    description:
      "A nanopigmentação é uma técnica que preenche os fios de forma fina e hiper-realista, com design estratégico e individual para cada cliente, trazendo naturalidade ao olhar.",
    duration: "2h – 2h30",    
    image:
      "/nanopigmentacao/eu.jpg",
    category: "sobrancelha",
    features: [
      "Técnica nanofios hiper-realistas",
      "Pigmentos hipoalergênicos",
      "Retoque incluído em 21 dias",
      "Durabilidade de 1 a 3 anos",
    ],
  },
  {
    id: 4,
    slug: "micropigmentacao-barba",
    icon: "beard",
    title: "Micropigmentação de Barba",
    shortDescription:
      "Preenchimento e definição para homens que desejam uma barba mais densa e uniforme.",
    description:
      "Técnica exclusiva masculina que preenche falhas e define o contorno da barba com resultado natural. Indicado para homens com barba rala, com áreas sem crescimento de pelos ou que desejam um visual mais definido e uniforme sem esforço diário.",
    duration: "2h – 3h",    
    image:
      "/gallery-barba/logo_barba.jpg",
    category: "barba",
    features: [
      "Técnica exclusiva masculina",
      "Preenchimento de falhas",
      "Definição de contorno",
      "Aspecto natural e duradouro",
    ],
  },
];

// ─── Depoimentos ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    rating: 5,
    service: "Micropigmentação de Sobrancelha",
    text: "Buscava um resultado natural e discreto, e fui atendida com excelente técnica e cuidado. O procedimento foi conduzido com calma, e o formato das sobrancelhas valorizou meu rosto sem exageros.",
    date: "Março 2026",
  },
  {
    id: 2,
    name: "Ana Carvalho",
    rating: 5,
    service: "Design de Sobrancelhas",
    text: "Atendimento pontual, ambiente acolhedor e execução impecável. O design respeitou minhas características e trouxe um acabamento elegante, exatamente como eu esperava.",
    date: "Setembro 2025",
  },
  {
    id: 3,
    name: "Fernanda Lima",
    rating: 5,
    service: "Micropigmentação de Sobrancelha",
    text: "Sempre tive insegurança com falhas nas sobrancelhas, e o resultado me trouxe mais confiança no dia a dia. O trabalho foi feito com sensibilidade e excelente padrão técnico.",
    date: "Abril 2024",
  },
  {
    id: 4,
    name: "Carlos Mendes",
    rating: 5,
    service: "Micropigmentação de Barba",
    text: "Fiquei positivamente surpreso com a naturalidade da micropigmentação da barba. A profissional explicou cada etapa com clareza e conduziu o processo com atenção aos detalhes.",
    date: "Novembro 2023",
  },
  {
    id: 5,
    name: "Bianca Rocha",
    rating: 5,
    service: "Design de Sobrancelhas",
    text: "Retornei após algum tempo e a qualidade permanece excelente. O atendimento é sempre atencioso, e o resultado final mantém um aspecto harmonioso e duradouro.",
    date: "Julho 2022",
  },
  {
    id: 6,
    name: "Patricia Gomes",
    rating: 5,
    service: "Método RevitalizeBrow",
    text: "Escolhi o RevitalizeBrow após outras tentativas sem sucesso e tive uma experiência excelente. O plano foi personalizado, a condução foi extremamente profissional e o resultado ficou natural, com recuperação visível da harmonia das sobrancelhas.",
    date: "Fevereiro 2026",
  },
];

// ─── Galeria ─────────────────────────────────────────────────────────────────
export const galleryImages = [
  {
    id: 1,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Micropigmentação — Antes e Depois",
    image: "/gallery-sobrancelha/anteEdep1.jpg",
  },
  // {
  //   id: 2,
  //   category: "sobrancelha",
  //   label: "Sobrancelha",
  //   title: "Micropigmentação Fio a Fio — Progressão",
  //   image: "/gallery-sobrancelha/sobran_an.jpg",
  // },
  {
    id: 3,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Sobrancelha + Cílios — Antes e Depois",
    image: "/gallery-sobrancelha/sobra_antEdep.jpg",
  },
  { id: 4,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Design de Sobrancelhas — Resultado Natural",
    image: "/gallery-sobrancelha/sobra5.jpg",
  },  
  {
    id: 5,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Design de Sobrancelhas",
    image: "/gallery-sobrancelha/sobra1.jpg",
  },
  // {
  //   id: 6,
  //   category: "sobrancelha",
  //   label: "Sobrancelha",
  //   title: "Coloração de Sobrancelhas",
  //   image: "/gallery-sobrancelha/sobra2.jpg",
  // },  
    {
    id: 13,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Definição de Sobrancelha",
    image:
      "/gallery-sobrancelha/sobra13.jpg",
  },
  {
    id: 14,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Definição de Sobrancelha",
    image:
      "/gallery-sobrancelha/sobra14.jpg",
  },
  {
    id: 15,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Definição de Sobrancelha",
    image:
      "/gallery-sobrancelha/sobra15.jpg",
  },
  {
    id: 16,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Definição de Sobrancelha",
    image:
      "/gallery-sobrancelha/sobra16.jpg",
  },
  {
    id: 17,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Definição de Sobrancelha",
    image:
      "/gallery-sobrancelha/sobra17.jpg",
  },
  {
    id: 7,
    category: "barba",
    label: "Barba",
    title: "Micropigmentação de Barba",
    image:
      "/gallery-barba/barba1.jpg",
  }, 
  {
    id: 8,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "/gallery-barba/barba2.jpg",
  },
  {
    id: 9,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "/gallery-barba/barba3.jpg",
  },
  {
    id: 10,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "/gallery-barba/barba4.jpg",
  },
  {
    id: 11,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "/gallery-barba/barba5.jpg",
  },
  {
    id: 12,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "/gallery-barba/barba6.jpg",
  }, 

    
];

// ─── Diferenciais (About section) ────────────────────────────────────────────
export const differentials = [
  {
    id: 1,
    number: "8+",
    label: "Anos de Experiência",
    description: "Dedicados à arte da beleza",
  },
  {
    id: 2,
    number: "2.000+",
    label: "Clientes Atendidas",
    description: "Transformações realizadas",
  },
  {
    id: 3,
    number: "15+",
    label: "Cursos & Certificações",
    description: "Sempre em atualização",
  },
  {
    id: 4,
    number: "100%",
    label: "Satisfação Garantida",
    description: "Seu bem-estar é prioridade",
  },
];

// ─── Serviços de interesse (formulário de contato) ────────────────────────────
export const serviceOptions = [
  { value: "", label: "Selecione um serviço" },
  { value: "design-sobrancelhas", label: "Design de Sobrancelhas" },
  { value: "metodo-revitalize", label: "Método RevitalizeBrow" },
  {
    value: "micropigmentacao-sobrancelha",
    label: "Micropigmentação de Sobrancelha",
  },
  { value: "micropigmentacao-barba", label: "Micropigmentação de Barba" },
  { value: "outros", label: "Outros / Dúvidas" },
];

// ─── Categorias da Galeria ────────────────────────────────────────────────────
export const galleryCategories = [
  { value: "all", label: "Todos" },
  { value: "sobrancelha", label: "Sobrancelha" },
  { value: "barba", label: "Barba" },
];
