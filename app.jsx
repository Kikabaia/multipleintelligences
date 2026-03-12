import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Heart, Brain, AlertCircle, BarChart3, 
  Zap, Library, X, BookOpen, Clock, Scale, Quote, Network, 
  Layers, Shuffle, Target, Activity, Microscope, Filter, ArrowUp, ArrowDown, TestTube 
} from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalContent) {
        if (e.key === 'Escape') setModalContent(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, modalContent]);

  // Nova ordem com Letramento Científico inserido após as "Boas Intenções"
  const slides = [
    <SlideIntro key="intro" />,
    <SlideGoodIntentions key="good-intentions" />,
    <SlideScientificMethod key="scientific-method" />,
    <SlideEvidencePyramid key="evidence-pyramid" />,
    <SlideQuote key="quote" />,
    <SlideTheCaricature key="caricature" />,
    <SlideTheData setModalContent={setModalContent} key="data" />,
    <SlideRareConsensus key="rare-consensus" />,
    <SlideNeuromyths key="neuromyths" />,
    <SlideThePrice key="price" />,
    <SlideCHC key="chc" />,
    <SlideCognitiveLoad key="clt" />,
    <SlideRetrieval key="retrieval" />,
    <SlideSpacedInterleaved key="spaced" />
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden flex flex-col select-text selection:bg-blue-500/40 selection:text-white">
      <div className="h-1 bg-slate-800 w-full fixed top-0 z-50">
        <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
      </div>

      <main className="flex-1 relative flex items-center justify-center p-8">
        <div className="w-full max-w-6xl relative h-[80vh] flex items-center">
          {slides.map((slide, index) => (
            <div key={index} className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center ${index === currentSlide ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-8 absolute pointer-events-none'}`}>
              {slide}
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full p-6 flex justify-between items-center bg-gradient-to-t from-slate-900 to-transparent z-40">
        <div className="text-slate-400 font-mono text-sm">Slide {currentSlide + 1} de {slides.length}</div>
        <div className="flex gap-4">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-colors"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/20"><ChevronRight size={24} /></button>
        </div>
      </footer>

      {/* Modal Reutilizável */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-700 p-2 rounded-full"><X size={20} /></button>
            <h3 className="text-2xl font-bold text-blue-400 mb-2 flex items-center gap-3">
              {modalContent.icon} {modalContent.title}
            </h3>
            <p className="text-sm text-emerald-400 font-mono mb-6 pb-4 border-b border-slate-700 flex flex-col">
              <span className="text-slate-500 text-xs mb-1">Referência Primária:</span>
              {modalContent.reference}
            </p>
            <div className="text-lg text-slate-200 leading-relaxed space-y-4">
              {modalContent.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= SLIDES =================

function SlideIntro() {
  return (
    <div className="text-center space-y-8 w-full">
      <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-4">
        <Brain size={64} className="text-blue-400" />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 leading-tight">
        A Beleza da Intenção<br />e o Rigor da Ciência
      </h1>
      <p className="text-2xl text-slate-300 font-light max-w-3xl mx-auto">
        Desconstruindo o Neuromito das Múltiplas Inteligências através do Design Instrucional Baseado em Evidências.
      </p>
    </div>
  );
}

function SlideGoodIntentions() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <Heart size={48} className="text-rose-400" />
        <h2 className="text-4xl font-bold text-white">Uma Mensagem Libertadora</h2>
      </div>
      <div className="bg-slate-800/60 p-8 rounded-2xl border-l-4 border-rose-400 shadow-xl">
        <p className="text-2xl text-slate-200 leading-relaxed mb-6 font-light italic">
          "Cada pessoa seria dotada de um tipo próprio de brilho — uma centelha singular que os testes convencionais jamais conseguiriam capturar."
        </p>
        <ul className="space-y-4 text-lg text-slate-300">
          <li className="flex gap-3"><span className="text-rose-400">✓</span> Reconheceu que todas as crianças têm valor, independentemente das notas.</li>
          <li className="flex gap-3"><span className="text-rose-400">✓</span> Inspirou educadores a valorizar a arte, o corpo e a empatia na escola.</li>
          <li className="flex gap-3"><span className="text-rose-400">✓</span> Trouxe alento humanista contra um sistema escolar frio e competitivo.</li>
        </ul>
        <div className="mt-8 text-rose-300 font-medium bg-rose-500/10 p-4 rounded-lg">
          Pedagogicamente, seu legado de inclusão, diversidade e afeto é inegável e fundamental.
        </div>
      </div>
    </div>
  );
}

// ==== NOVO SLIDE: LETRAMENTO CIENTÍFICO ====
function SlideScientificMethod() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <Microscope size={40} className="text-blue-400" />
        <h2 className="text-4xl font-bold text-white">O Crivo da Ciência: Como saber se algo funciona?</h2>
      </div>
      
      <p className="text-xl text-slate-300 text-center mb-10 max-w-3xl mx-auto">
        Na educação, costumamos adotar métodos baseados na <strong>intuição</strong> ou porque "parecem corretos". Mas a filosofia da ciência nos exige mais rigor.
      </p>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-rose-500 shadow-xl relative">
          <h3 className="text-2xl font-bold text-rose-400 mb-4">O Risco da Pseudociência</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Uma teoria não é científica apenas porque usa termos difíceis (como "inteligência" ou "neural"). Se uma teoria explica *qualquer* resultado e não pode ser testada ou refutada, ela não é ciência; é um dogma.
          </p>
          <div className="mt-4 p-3 bg-rose-500/10 rounded-lg text-rose-300 text-sm">
            Exemplo: "Se o aluno foi mal, é porque não acessamos a inteligência certa dele." — Essa frase blinda a teoria de qualquer falha.
          </div>
        </div>

        <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-emerald-500 shadow-xl relative">
          <h3 className="text-2xl font-bold text-emerald-400 mb-4">O Rigor Empírico</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            A verdadeira ciência constrói hipóteses <strong>falsificáveis</strong> (Karl Popper). Ela testa o método A contra o método B em grupos controlados e mede os resultados reais, independente do que "gostaríamos" que fosse verdade.
          </p>
          <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg text-emerald-300 text-sm">
            Na medicina, não prescrevemos remédios baseados em "boas intenções". Por que na educação aceitamos métodos sem validação empírica?
          </div>
        </div>
      </div>
    </div>
  );
}

// ==== SLIDE: PIRÂMIDE DE EVIDÊNCIAS COM HOVER CORRIGIDO ====
function SlideEvidencePyramid() {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
      <div className="flex items-center gap-4 mb-4 justify-center">
        <Filter size={40} className="text-amber-400" />
        <h2 className="text-4xl font-bold text-white">A Hierarquia de Evidências</h2>
      </div>
      <p className="text-lg text-slate-300 text-center mb-8 max-w-4xl">
        Nem toda evidência tem o mesmo peso. Passe o mouse sobre as camadas. Onde a sua metodologia de ensino está apoiada?
      </p>

      <div className="flex w-full items-center justify-between gap-6 px-4">
        {/* Eixo Esquerdo: Qualidade */}
        <div className="flex flex-col items-center text-emerald-400 font-bold opacity-80">
          <span className="mb-2 border border-emerald-400 px-3 py-1 rounded">Maior</span>
          <ArrowUp size={40} className="my-2" />
          <span className="text-center text-sm w-24">Qualidade da Evidência</span>
          <ArrowDown size={40} className="my-2 rotate-180 text-rose-400" />
          <span className="mt-2 border border-rose-400 text-rose-400 px-3 py-1 rounded">Menor</span>
        </div>

        {/* A Pirâmide Central */}
        <div className="flex-1 flex flex-col items-center gap-1 w-full max-w-2xl">
          {/* Topo: Revisões Sistemáticas */}
          <div 
            className="w-[30%] bg-emerald-500/90 transition-all cursor-help py-4 px-2 rounded-t-lg text-center font-bold text-slate-900 relative shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            style={{ 
              zIndex: hoveredLayer === 5 ? 100 : 50,
              transform: hoveredLayer === 5 ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: hoveredLayer === 5 ? '#34d399' : '' 
            }}
            onMouseEnter={() => setHoveredLayer(5)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="text-xs md:text-sm">Revisões Sistemáticas & Meta-análises</span>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl transition-opacity pointer-events-none border border-emerald-500 text-left ${hoveredLayer === 5 ? 'opacity-100' : 'opacity-0'}`}>
              <strong>O Padrão Ouro:</strong> Sintetiza estatisticamente os resultados de dezenas ou centenas de ensaios clínicos ao redor do mundo. A conclusão definitiva.
            </div>
          </div>
          
          {/* RCTs */}
          <div 
            className="w-[50%] bg-blue-500/90 transition-all cursor-help py-4 px-2 text-center font-bold text-slate-900 relative"
            style={{ 
              zIndex: hoveredLayer === 4 ? 100 : 40,
              transform: hoveredLayer === 4 ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: hoveredLayer === 4 ? '#60a5fa' : '' 
            }}
            onMouseEnter={() => setHoveredLayer(4)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="text-sm md:text-base">Ensaios Clínicos Randomizados</span>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl transition-opacity pointer-events-none border border-blue-500 text-left ${hoveredLayer === 4 ? 'opacity-100' : 'opacity-0'}`}>
              <strong>Causa e Efeito:</strong> Teste estruturado. Grupo A usa o método novo, Grupo B usa o método tradicional. Resultados são comparados matematicamente.
            </div>
          </div>

          {/* Observacionais (Coorte/Transversais) */}
          <div 
            className="w-[70%] bg-yellow-500/90 transition-all cursor-help py-4 px-2 text-center font-bold text-slate-900 relative"
            style={{ 
              zIndex: hoveredLayer === 3 ? 100 : 30,
              transform: hoveredLayer === 3 ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: hoveredLayer === 3 ? '#facc15' : '' 
            }}
            onMouseEnter={() => setHoveredLayer(3)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="text-sm md:text-base">Estudos Observacionais (Transversais/Coorte)</span>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl transition-opacity pointer-events-none border border-yellow-500 text-left ${hoveredLayer === 3 ? 'opacity-100' : 'opacity-0'}`}>
              <strong>Correlações:</strong> Observa-se grandes populações para identificar padrões. (Ex: Testar milhares de alunos para ver se as inteligências são independentes).
            </div>
          </div>

          {/* Relatos de Caso */}
          <div 
            className="w-[90%] bg-orange-400/90 transition-all cursor-help py-4 px-2 text-center font-bold text-slate-900 relative"
            style={{ 
              zIndex: hoveredLayer === 2 ? 100 : 20,
              transform: hoveredLayer === 2 ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: hoveredLayer === 2 ? '#fb923c' : '' 
            }}
            onMouseEnter={() => setHoveredLayer(2)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="text-sm md:text-base">Relatos de Caso / Estudos de Caso</span>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl transition-opacity pointer-events-none border border-orange-400 text-left ${hoveredLayer === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <strong>Anedotas Estruturadas:</strong> Observação aprofundada de um paciente único (ex: pacientes com lesão cerebral). Bom para gerar hipóteses, ruim para comprovar regras.
            </div>
          </div>

          {/* Base: Opinião de Especialista */}
          <div 
            className="w-[100%] bg-rose-500/90 transition-all cursor-help py-4 px-2 rounded-b-lg text-center font-bold text-slate-900 relative"
            style={{ 
              zIndex: hoveredLayer === 1 ? 100 : 10,
              transform: hoveredLayer === 1 ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: hoveredLayer === 1 ? '#fb7185' : '' 
            }}
            onMouseEnter={() => setHoveredLayer(1)}
            onMouseLeave={() => setHoveredLayer(null)}
          >
            <span className="text-sm md:text-base">Editoriais, Opinião de Especialistas & Ideias Prévias</span>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl transition-opacity pointer-events-none border border-rose-500 text-left ${hoveredLayer === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <strong>A Base Fraca:</strong> Alguém escreveu um livro com uma ideia que soa bonita. Possui o mais alto viés humano possível e quase nenhum rigor estatístico.
            </div>
          </div>
        </div>

        {/* Eixo Direito: Conflito de Interesse / Viés */}
        <div className="flex flex-col items-center text-rose-400 font-bold opacity-80">
          <span className="mb-2 border border-emerald-400 text-emerald-400 px-3 py-1 rounded">Menor</span>
          <ArrowUp size={40} className="my-2 rotate-180 text-emerald-400" />
          <span className="text-center text-sm w-28">Viés / Conflito de Interesse</span>
          <ArrowDown size={40} className="my-2 text-rose-400" />
          <span className="mt-2 border border-rose-400 px-3 py-1 rounded">Maior</span>
        </div>
      </div>
    </div>
  );
}

function SlideQuote() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <TestTube size={40} className="text-blue-400" />
        <h2 className="text-3xl font-bold text-white">Voltando à Base da Pirâmide: A Origem de Gardner</h2>
      </div>
      
      <p className="text-xl text-slate-300 text-center mb-6">
        O livro "Frames of Mind" (1983) habitava exclusivamente a base fraca da pirâmide (opiniões e relatos de lesões raras). O próprio Gardner admite a manobra:
      </p>

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-rose-500/30 relative">
        <Quote size={80} className="text-slate-700 absolute -top-4 -left-4 z-0 opacity-50" />
        <p className="text-xl text-slate-300 italic leading-relaxed mb-6 relative z-10">
          "I don’t remember when it happened but at a certain moment, I decided to call these faculties 'multiple intelligences' rather than 'assorted abilities' or 'sundry gifts.' <strong>This seemingly minor lexical substitution proved very important; I am quite confident that if I had written a book called 'Seven Talents' it would not have received the attention that Frames of Mind received.</strong>"
        </p>
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg relative z-10">
          <p className="text-blue-200 text-sm">
            <strong>Tradução Livre:</strong> "(...) Estou bastante confiante de que se eu tivesse escrito um livro chamado 'Sete Talentos', ele não teria recebido a atenção que recebeu. A escolha da palavra 'inteligência' me impulsionou para um confronto."
          </p>
        </div>
        
        <div className="mt-6 flex items-center justify-between text-slate-400 text-sm border-t border-slate-700 pt-4 relative z-10">
          <span className="font-medium text-rose-300">Evidência: A fundação foi retórica (Opinião), não empírica.</span>
          <span className="font-mono text-emerald-400">Ref: Gardner, H. (2011). Multiple Intelligences: The First Thirty Years.</span>
        </div>
      </div>
    </div>
  );
}

function SlideTheCaricature() {
  return (
    <div className="max-w-4xl mx-auto text-center w-full">
      <h2 className="text-3xl font-bold text-amber-400 mb-8">A Construção de um "Vilão" Fictício</h2>
      <p className="text-xl text-slate-300 mb-8 leading-relaxed">
        Gardner construiu sua teoria combatendo uma caricatura. Ele chamava de "vilões" os pesquisadores do modelo de inteligência geral. Mas a psicologia séria nunca afirmou que o QI media o "valor moral" de uma pessoa.
      </p>
      <div className="grid grid-cols-2 gap-8 text-left">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative">
          <h3 className="text-amber-400 font-bold mb-4 text-xl">A Narrativa de Gardner:</h3>
          <p className="text-slate-400 text-lg leading-relaxed">O campo da psicometria era um monólito cruel que só enxergava um tipo de inteligência matemática e linguística rígida, ignorando todo o resto.</p>
        </div>
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative">
          <h3 className="text-emerald-400 font-bold mb-4 text-xl">A Realidade Histórica:</h3>
          <p className="text-slate-400 text-lg leading-relaxed">Décadas antes de Gardner, psicometristas já haviam proposto modelos multifatoriais com raciocínio fluido e cristalizado.</p>
          <p className="text-sm font-mono text-emerald-500/70 mt-6 absolute bottom-4">Ref: Horn & Cattell (1966); Carroll (1993)</p>
        </div>
      </div>
    </div>
  );
}

function SlideTheData({ setModalContent }) {
  const content = [
    {
      title: "Variedade Positiva (Fator g)",
      icon: <BarChart3 className="text-blue-400" size={32} />,
      color: "hover:border-blue-500",
      modal: {
        title: "A Interdependência Psicométrica",
        icon: <BarChart3 className="text-blue-400" size={28} />,
        reference: "Visser, B. A., Ashton, M. C., & Vernon, P. A. (2006). Beyond g: Putting multiple intelligences theory to the test. Intelligence, 34(5), 487-502.",
        text: (
          <div className="space-y-4">
            <p>Na psicometria, existe um fenômeno robusto chamado <strong>"Variedade Positiva" (Positive Manifold)</strong>: estatisticamente, pessoas que se saem bem em um tipo de teste cognitivo tendem a se sair bem em quase todos os outros.</p>
            <p>A teoria das Múltiplas Inteligências exige facetas independentes (musical, espacial, lógica separadas). Quando Visser testou empiricamente as inteligências de Gardner, o padrão observado foi o contrário.</p>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <strong className="text-blue-400 block mb-2">O Resultado dos Dados:</strong>
              As pontuações nessas áreas se correlacionam fortemente. Elas formam uma estrutura hierárquica com o fator geral (g) no topo. Do ponto de vista preditivo, medidas alinhadas a "g" explicam desempenho escolar melhor do que qualquer bateria "MI".
            </div>
            <p className="text-rose-400 font-bold">Conclusão: Não há independência mensurável.</p>
          </div>
        )
      }
    },
    {
      title: "Redes Neurais (fMRI)",
      icon: <Network className="text-violet-400" size={32} />,
      color: "hover:border-violet-500",
      modal: {
        title: "O Fim do Mito dos Módulos",
        icon: <Network className="text-violet-400" size={28} />,
        reference: "Waterhouse, L. (2006). Multiple Intelligences, the Mozart Effect, and Emotional Intelligence: A Critical Review. Educational Psychologist.",
        text: (
          <div className="space-y-4">
            <p>Gardner baseou grande parte de sua hipótese em pacientes com lesões cerebrais, sugerindo que o cérebro possui <strong>"módulos" (silos) separados e autônomos</strong> para cada inteligência.</p>
            <p>A neurociência moderna, com o uso de ressonância magnética funcional (fMRI), derrubou completamente essa ideia. O cérebro opera em <strong>redes neurais altamente integradas e distribuídas</strong> (Reutilização Neural).</p>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <strong className="text-violet-400 block mb-2">A Arquitetura Real:</strong>
              Resolver um problema matemático ou compor uma música recruta áreas cerebrais sobrepostas, como o córtex pré-frontal (funções executivas). A arquitetura é parcialmente compartilhada.
            </div>
            <p className="text-rose-400 font-bold">Conclusão: O hardware do cérebro não é particionado em "silos" isolados como o modelo sugere.</p>
          </div>
        )
      }
    },
    {
      title: "Hipótese da Correspondência",
      icon: <Shuffle className="text-amber-400" size={32} />,
      color: "hover:border-amber-500",
      modal: {
        title: "A Falácia da Hipótese da Correspondência",
        icon: <Shuffle className="text-amber-400" size={28} />,
        reference: "Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning Styles: Concepts and Evidence. Psychological Science in the Public Interest.",
        text: (
          <div className="space-y-4">
            <p>Muitos educadores acreditam que se você combinar (dar "match") o método de ensino com a "inteligência" do aluno, ele aprenderá melhor (Meshing Hypothesis).</p>
            <p>Em 2008, um estudo massivo liderado por Harold Pashler revisou toda a literatura científica em busca de provas dessa hipótese e descobriram que <strong>essa correspondência não funciona.</strong></p>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <strong className="text-amber-400 block mb-2">O Dano Estrutural:</strong>
              Tentar ensinar um conceito espacial usando música para um aluno "musical", ou ensinar gramática através de dança para um aluno "cinestésico", força o cérebro a fazer uma <strong>"tradução" desnecessária</strong>. Isso aumenta a Carga Cognitiva estranha e piora a retenção.
            </div>
            <p className="text-rose-400 font-bold">Conclusão: A natureza da matéria deve ditar o método de ensino, não a suposta "inteligência" primária do aluno.</p>
          </div>
        )
      }
    },
    {
      title: "O Efeito Novidade",
      icon: <Activity className="text-emerald-400" size={32} />,
      color: "hover:border-emerald-500",
      modal: {
        title: "O Efeito Novidade (A Falsa Correlação)",
        icon: <Activity className="text-emerald-400" size={28} />,
        reference: "Ferrero, M., Vadillo, M. A., & León, S. P. (2021). A valid evaluation of the theory of multiple intelligences is not yet possible. Intelligence.",
        text: (
          <div className="space-y-4">
            <p>Você pode se perguntar: <em>"Mas por que alguns professores juram que funciona e publicam artigos dizendo que os alunos melhoraram?"</em></p>
            <p>A crítica especializada aponta que os resultados positivos relatados <strong>não ocorrem por causa da teoria de Gardner</strong>, mas devido a um "Efeito Colateral do Esforço Pedagógico" (Efeito Novidade).</p>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <strong className="text-emerald-400 block mb-2">A Falha no Grupo de Controle:</strong>
              Pense no grupo de controle da maioria desses estudos fracos: O Grupo A (Controle) tem uma aula monótona lendo o livro. O Grupo B (MI) tem um professor engajado, que traz dinâmicas, jogos e interações. O Grupo B vai melhor não pela "Inteligência Musical", mas porque <strong>qualquer aula interativa engajada vence uma aula passiva.</strong>
            </div>
          </div>
        )
      }
    }
  ];

  return (
    <div className="max-w-5xl mx-auto text-center w-full">
      <h2 className="text-4xl font-bold text-white mb-6">O Confronto com o Topo da Pirâmide</h2>
      <p className="text-xl text-slate-300 mb-10">Onde a Teoria exige módulos isolados e correspondência, a ciência encontrou a realidade. Clique para desconstruir:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => setModalContent(item.modal)}
            className={`bg-slate-800 p-6 rounded-2xl border border-slate-700 ${item.color} transition-all group flex flex-col items-center text-center hover:bg-slate-800/80 hover:-translate-y-1`}
          >
            <div className="mb-4 p-3 bg-slate-900 rounded-full group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>
            <p className="text-sm text-slate-400 mt-2">Ver Evidência ➔</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SlideRareConsensus() {
  return (
    <div className="max-w-4xl mx-auto text-center w-full">
      <h2 className="text-4xl font-bold text-rose-500 mb-8">Um Veredito Raro na Ciência</h2>
      
      <div className="bg-slate-800 p-10 rounded-2xl border border-rose-500/30 shadow-xl relative text-left">
        <p className="text-xl text-slate-300 leading-relaxed mb-6">
          Em ciências, é extremamente raro ser taxativo. Em geral, teorias são consideradas "parcialmente corretas", "erradas nos detalhes" ou "com evidências fracas, mas em um caminho promissor".
        </p>
        <p className="text-xl text-white font-bold leading-relaxed mb-8">
          Mas no caso das Múltiplas Inteligências, a comunidade científica abriu uma exceção implacável.
        </p>
        
        <div className="p-6 bg-rose-500/10 border-l-4 border-rose-500 rounded-r-lg">
          <p className="text-xl text-rose-200 italic font-medium mb-4">
            "Benignas na aparência, mas danosas na prática."
          </p>
          <p className="text-slate-300 leading-relaxed text-lg">
            Os especialistas cravam de forma taxativa: o modelo é um <strong>neuromito</strong> e uma <strong>pseudociência</strong> educacional baseada em premissas neurológicas e estatísticas comprovadamente incorretas.
          </p>
          <p className="text-sm font-mono text-rose-500/70 mt-6">Ref: Geake, J. (2008). Neuromythologies in education.</p>
        </div>
      </div>
    </div>
  );
}

// ==== SLIDE DE NEUROMITOS COM REFERÊNCIA COMPLETA ====
function SlideNeuromyths() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-center gap-4 mb-10">
        <AlertCircle size={40} className="text-rose-500" />
        <h2 className="text-4xl font-bold text-white">Se a ciência refutou, por que domina?</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            A resposta é menos científica do que psicológica: <strong>a teoria prospera porque faz as pessoas se sentirem bem.</strong>
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            Nas faculdades de educação, ela virou um código de ética — uma bandeira moral sinalizando compaixão e rejeitando o "elitismo cognitivo". O ambiente escolar, cansado de desigualdades, acolheu com alívio essa promessa de redenção pedagógica.
          </p>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-2xl border-2 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)] relative">
          <div className="text-6xl font-extrabold text-rose-400 mb-4">80%+</div>
          <h3 className="text-2xl font-bold text-white mb-4">A Cultura da Pseudociência</h3>
          <p className="text-lg text-slate-300 mb-6">
            Mais de 80% dos docentes acreditam nesses conceitos (como Estilos de Aprendizagem) e os utilizam para guiar aulas reais.
          </p>
          <div className="mt-4 pt-4 border-t border-rose-500/30">
            <p className="text-rose-200 text-md font-medium mb-4">
              A pseudociência educacional não é um erro pontual — é uma cultura.
            </p>
            <p className="text-[11px] font-mono text-rose-500/80 leading-relaxed text-left">
              Ref: Macdonald, K., Germine, L., Anderson, A., Christodoulou, J., & McGrath, L. M. (2017). Dispelling the Myth: Training in Education or Neuroscience Decreases but Does Not Eliminate Beliefs in Neuromyths. <span className="italic">Front. Psychol., 8</span>, 1314.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideThePrice() {
  return (
    <div className="max-w-5xl mx-auto text-center w-full">
      <h2 className="text-4xl font-bold text-rose-400 mb-10">O Preço da Gentileza</h2>
      
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-amber-500 shadow-xl relative overflow-hidden">
          <Clock className="text-amber-500/10 absolute -bottom-4 -right-4" size={160} />
          <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
            <Clock className="text-amber-500" size={28} /> 
            Custo de Oportunidade
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed relative z-10 mb-4">
            Cada minuto e cada recurso investido em estratégias de múltiplas inteligências é um recurso <strong>não aplicado em práticas realmente eficazes</strong>.
          </p>
          <p className="text-slate-400 relative z-10">
            Professores treinados em teorias não validadas adotam métodos intuitivos, deixando de lado abordagens com base empírica sólida reconhecida por meta-análises.
          </p>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-rose-500 shadow-xl relative overflow-hidden">
          <Scale className="text-rose-500/10 absolute -bottom-4 -right-4" size={160} />
          <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
            <Scale className="text-rose-500" size={28} />
            Eficácia vs. Conforto
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed relative z-10 mb-6">
            O mito floresceu porque parecia ético, mas o resultado é o oposto: ele <strong>perpetua desigualdades</strong> ao substituir a eficácia pelo conforto.
          </p>
          <div className="p-4 bg-rose-500/20 rounded-lg border border-rose-500/30 relative z-10">
            <p className="text-rose-200 font-bold text-center text-lg">
              Em nome da gentileza, rebaixou-se o rigor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCHC() {
  return (
    <div className="w-full text-center max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
        A Alternativa Empírica: Teoria CHC
      </h2>
      <p className="text-slate-400 font-mono text-sm mb-10">O modelo hierárquico validado (Ref: Carroll, 1993)</p>

      <div className="bg-slate-800/80 p-10 rounded-2xl border border-violet-500/30 shadow-2xl relative">
        <div className="flex justify-center mb-10 relative z-10">
          <div className="w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <span className="text-4xl font-bold text-white italic">g</span>
          </div>
        </div>
        <div className="absolute top-[110px] left-1/2 w-[50%] h-[60px] border-t-2 border-l-2 border-r-2 border-slate-600 rounded-t-xl -translate-x-1/2"></div>
        
        <div className="grid grid-cols-2 gap-16 mt-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center rotate-45 mb-8 border-4 border-slate-800 shadow-lg shadow-blue-500/30">
              <Zap size={32} className="text-white -rotate-45" />
            </div>
            <h3 className="text-2xl font-bold text-blue-300 mb-2">Fluida (Gf)</h3>
            <p className="text-slate-300 text-center text-sm">O Motor de Raciocínio. Resolver problemas inéditos e deduzir lógica.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-xl flex items-center justify-center rotate-45 mb-8 border-4 border-slate-800 shadow-lg shadow-emerald-500/30">
              <Library size={32} className="text-white -rotate-45" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-300 mb-2">Cristalizada (Gc)</h3>
            <p className="text-slate-300 text-center text-sm">O Repertório. Vocabulário, regras e conhecimento prévio armazenado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCognitiveLoad() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Target size={40} className="text-emerald-400" />
        <h2 className="text-4xl font-bold text-white">1. Teoria da Carga Cognitiva</h2>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-emerald-500 shadow-xl relative">
        <p className="text-xl text-slate-200 leading-relaxed mb-6 font-light">
          A aprendizagem só ocorre se a <strong>Memória de Trabalho</strong> (limitada a cerca de 4 a 7 itens) não for sobrecarregada antes que a informação passe para a Memória de Longo Prazo.
        </p>
        
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="bg-slate-900 p-6 rounded-xl border border-rose-500/30">
            <h4 className="text-rose-400 font-bold text-lg mb-2">Carga Estranha (Distrações)</h4>
            <p className="text-slate-400 text-sm">
              Tentar ensinar com excesso de estímulos "multimodais" (tentando atingir várias "inteligências" ao mesmo tempo) na verdade aumenta o ruído visual e cognitivo, <strong>travando o aprendizado</strong>.
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl border border-emerald-500/30">
            <h4 className="text-emerald-400 font-bold text-lg mb-2">Carga Pertinente (Esforço Útil)</h4>
            <p className="text-slate-400 text-sm">
              O foco do design de aula deve ser no alinhamento direto do conteúdo com o esforço mental focado estritamente na regra que precisa ser aprendida.
            </p>
          </div>
        </div>
        <p className="text-sm font-mono text-emerald-500/70 mt-8">Ref: Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. Cognitive Science.</p>
      </div>
    </div>
  );
}

function SlideRetrieval() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Zap size={40} className="text-blue-400" />
        <h2 className="text-4xl font-bold text-white">2. Prática de Recuperação (Retrieval)</h2>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-blue-500 shadow-xl relative">
        <p className="text-xl text-slate-200 leading-relaxed mb-6">
          O aprendizado <strong>não é um processo de "inserir" dados</strong> no cérebro, mas de forçar o cérebro a "puxar" os dados de volta à consciência.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 items-start bg-slate-900 p-5 rounded-xl">
            <div className="bg-rose-500/20 text-rose-400 p-2 rounded-lg font-bold">O Mito</div>
            <p className="text-slate-300">Métodos passivos (reler textos, assistir aulas expositivas, grifar) geram apenas uma ilusão de fluência de curto prazo, mas resultam em péssima retenção.</p>
          </div>
          
          <div className="flex gap-4 items-start bg-slate-900 p-5 rounded-xl border border-blue-500/30">
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg font-bold">O Mecanismo</div>
            <p className="text-slate-300">Fazer alunos resolverem problemas ativamente ou tomarem decisões com consequências lógicas gera muito mais retenção do que tentar "cantar" as regras gramaticais. O esforço da recuperação ativa fortalece sinapses neurais universais, independente do "talento" do aluno.</p>
          </div>
        </div>
        
        <p className="text-sm font-mono text-blue-500/70 mt-8">Ref: Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention.</p>
      </div>
    </div>
  );
}

function SlideSpacedInterleaved() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Layers size={40} className="text-fuchsia-400" />
        <h2 className="text-4xl font-bold text-white">3. Prática Espaçada e Intercalada</h2>
      </div>
      
      <div className="bg-slate-800 p-8 rounded-2xl border-t-4 border-fuchsia-500 shadow-xl relative grid grid-cols-2 gap-10">
        
        <div>
          <h3 className="text-2xl font-bold text-fuchsia-300 mb-4 flex items-center gap-2">
            <Clock size={24} /> Espaçada (Spaced)
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            A distribuição do tempo altera drasticamente a curva de esquecimento do cérebro.
          </p>
          <p className="text-slate-400 text-sm">
            Em vez de concentrar o estudo num único bloco, distribuir as sessões ao longo de dias força o cérebro a recuperar a informação quando ela está prestes a ser esquecida, consolidando a memória de longo prazo.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-fuchsia-300 mb-4 flex items-center gap-2">
            <Shuffle size={24} /> Intercalada (Interleaved)
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Misturar diferentes tipos de problemas na mesma sessão de prática.
          </p>
          <p className="text-slate-400 text-sm">
            Ao invés de resolver 20 exercícios seguidos sobre um único tempo verbal, intercalar desafios gramaticais diferentes ensina o aluno não apenas <em>como</em> aplicar a regra, mas identificar <em>qual</em> regra aplicar e <em>quando</em>.
          </p>
        </div>
        
        <div className="col-span-2 text-sm font-mono text-fuchsia-500/70 mt-4 pt-6 border-t border-slate-700">
          Ref: Dunlosky, J., et al. (2013). Improving Students’ Learning With Effective Learning Techniques.
        </div>
      </div>
    </div>
  );
}