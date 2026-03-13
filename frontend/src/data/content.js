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
    title: "Design de Sobrancelhas",
    shortDescription:
      "Modelagem personalizada para realçar e harmonizar o seu olhar conforme o formato do seu rosto.",
    description:
      "Cada rosto é único, e as sobrancelhas são o moldura do olhar. Utilizo técnicas precisas de mapeamento facial para criar um design exclusivo que realça sua beleza natural. O procedimento inclui análise de formato de rosto, higienização, modelagem e finalização.",
    duration: "45 min – 1h",
    // TODO: Atualizar preços reais
    price: "A partir de R$ 60",
    image:
      "/gallery/design-sobrancelhas.jpg",
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
    slug: "remocao-tatuagem-laser",
    icon: "laser",
    title: "Remoção de Tatuagem a Laser",
    shortDescription:
      "Tecnologia de ponta para remoção segura, progressiva e eficaz de tatuagens de qualquer tamanho.",
    description:
      "Utilize a tecnologia Q-Switched para fragmentar os pigmentos da tatuagem de forma segura. O laser atinge as partículas de tinta sem agredir os tecidos ao redor. O número de sessões varia conforme o tamanho, cor e profundidade da tatuagem.",
    duration: "Conforme o tamanho",
    price: "Consulte valores",
    image:
      "/gallery/remoção-tatuagem.jpg",
    category: "laser",
    features: [
      "Tecnologia Q-Switched",
      "Avaliação prévia gratuita",
      "Pigmentos coloridos e preto",
      "Acompanhamento pós-procedimento",
    ],
  },
  {
    id: 3,
    slug: "micropigmentacao-sobrancelha",
    icon: "micropigmentation",
    title: "Micropigmentação de Sobrancelha",
    shortDescription:
      "Técnica fio a fio (hairstrokes) para sobrancelhas com aspecto 100% natural e duradouro.",
    description:
      "A micropigmentação por técnica fio a fio imita os fios naturais de sobrancelha, criando um resultado extremamente realista e duradouro. Ideal para quem tem falhas, sobrancelhas ralas ou deseja praticidade no dia a dia sem abrir mão de um visual impecável.",
    duration: "2h – 2h30",
    price: "A partir de R$ 350",
    image:
      "/gallery/micropigmentacao-sobrancelha.jpg",
    category: "sobrancelha",
    features: [
      "Técnica fio a fio (hairstrokes)",
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
    price: "A partir de R$ 400",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
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
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    rating: 5,
    service: "Micropigmentação de Sobrancelha",
    text: "A Desiree transformou completamente minhas sobrancelhas! O resultado ficou incrível, super natural. Ela tem uma mão leve e muito talento. Recomendo de olhos fechados!",
    date: "Janeiro 2026",
  },
  {
    id: 2,
    name: "João Pereira",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    service: "Remoção de Tatuagem a Laser",
    text: "Fiz a remoção do laser e o resultado superou todas as minhas expectativas. Profissional extremamente qualificada, me deixou bem informado sobre todo o processo. Estou muito satisfeito!",
    date: "Dezembro 2025",
  },
  {
    id: 3,
    name: "Ana Carvalho",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    service: "Design de Sobrancelhas",
    text: "Micropigmentação perfeita! Meu rosto mudou completamente para melhor. A Desiree tem muito cuidado e capricho em cada detalhe. Vale cada centavo!",
    date: "Novembro 2025",
  },
  {
    id: 4,
    name: "Fernanda Lima",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    service: "Micropigmentação de Sobrancelha",
    text: "Sempre tive vergonha das minhas sobrancelhas ralas, mas após a micropigmentação com a Desiree eu me sinto muito mais confiante. Resultado lindo e duradouro!",
    date: "Outubro 2025",
  },
  {
    id: 5,
    name: "Carlos Mendes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    service: "Micropigmentação de Barba",
    text: "Nunca pensei que micropigmentação de barba me deixaria tão diferente! A Desiree explicou tudo com paciência e o resultado ficou extremamente natural. Super recomendo!",
    date: "Setembro 2025",
  },
  {
    id: 6,
    name: "Bianca Rocha",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    rating: 5,
    service: "Design de Sobrancelhas",
    text: "Atendimento incrível do início ao fim! Ambiente muito aconchegante e a Desiree é uma profissional nota 10. Minhas sobrancelhas nunca estiveram tão bonitas. Já sou fã!",
    date: "Agosto 2025",
  },
];

// ─── Galeria ─────────────────────────────────────────────────────────────────
export const galleryImages = [
  {
    id: 1,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Micropigmentação — Antes e Depois",
    image: "/gallery-sobrancelha/sobrancelha1.jpg",
  },
  {
    id: 2,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Micropigmentação Fio a Fio — Progressão",
    image: "/gallery-sobrancelha/sobrancelha2.jpg",
  },
  {
    id: 3,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Sobrancelha + Cílios — Antes e Depois",
    image: "/gallery-sobrancelha/sobrancelha3.jpg",
  },
  { id: 4,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Sobrancelha + Cílios — Antes e Depois",
    image: "/gallery-sobrancelha/sobrancelha4.jpg",
  },  
  {
    id: 5,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Design de Sobrancelhas",
    image: "/gallery-sobrancelha/sobrancelha5.jpg",
  },
  {
    id: 6,
    category: "sobrancelha",
    label: "Sobrancelha",
    title: "Coloração de Sobrancelhas",
    image: "/gallery-sobrancelha/sobrancelha4.jpg",
  },  
  {
    id: 7,
    category: "barba",
    label: "Barba",
    title: "Micropigmentação de Barba",
    image:
      "gallery-barba/barba1.jpg",
  }, 
  {
    id: 8,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "gallery-barba/barba2.jpg",
  },
  {
    id: 9,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "gallery-barba/barba3.jpg",
  },
  {
    id: 10,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "gallery-barba/barba4.jpg",
  },
  {
    id: 11,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "gallery-barba/barba5.jpg",
  },
  {
    id: 12,
    category: "barba",
    label: "Barba",
    title: "Definição de Barba",
    image:
      "gallery-barba/barba6.jpg",
  }, 
  {
    id: 15,
    category: "laser",
    label: "Laser",
    title: "Tratamento a Laser",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
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
  { value: "remocao-laser", label: "Remoção de Tatuagem a Laser" },
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
  { value: "laser", label: "Laser" },
  { value: "barba", label: "Barba" },
];
