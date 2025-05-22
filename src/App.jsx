import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import emailjs from 'emailjs-com';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ThankYou from "./pages/ThankYou";
import OrientationTest from "./pages/OrientationTest";
import TestResults from "./pages/TestResults";
import TestStart from "./pages/TestStart";
import {
  Brain,
  Video,
  Briefcase,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Linkedin
} from "lucide-react";

// Inizializza EmailJS
emailjs.init("i1rCVAliriMSl7lGa");

function HomePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      toast({
        title: "Errore",
        description: "Per favore compila i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Invia l'email usando EmailJS
      const response = await emailjs.send(
        "service_00kzzl5",
        "template_hp5h2vn",
        {
          to_email: "info@labirinth.it",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "i1rCVAliriMSl7lGa"
      );

      console.log("Email inviata con successo:", response);

      // Salva i dati nel localStorage
      localStorage.setItem("waitlist_data", JSON.stringify(formData));
      
      // Reindirizza alla pagina di ringraziamento
      navigate("/thank-you");
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const problems = [
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "Incertezza sul futuro",
      description: "Non sei soddisfatto del tuo percorso attuale e cerchi una nuova direzione?"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "Mancanza di crescita",
      description: "Ti senti bloccato nel tuo ruolo attuale senza prospettive di crescita?"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "Scelte difficili",
      description: "Hai tante scelte possibili e non sai quale ti possa dare maggiori soddisfazioni?"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "Skills da aggiornare",
      description: "Le competenze richieste dal mercato sono cambiate e senti di doverne imparare di nuove?"
    }
  ];

  const faqItems = [
    {
      title: "Quanto costa il servizio?",
      content: "I prezzi varieranno in base al tipo di percorso scelto. Iscrivendoti alla lista d'attesa, riceverai tutte le informazioni in anteprima e potrai accedere ad una prova gratuita."
    },
    {
      title: "Quanto tempo richiede il percorso?",
      content: "La durata varia in base a quante simulazioni di lavoro virtuali vorrai fare. Una simulazione dura in media un paio di ore ed il test richiede circa 30 minuti."
    },
    {
      title: "Come funzionano i tirocini virtuali?",
      content: "I tirocini virtuali sono simulazioni realistiche di situazioni lavorative, realizzate con professionisti del settore. Lavorerai su progetti reali, riceverai feedback e costruirai un portfolio concreto."
    },
    {
      title: "Che tipo di supporto riceverò?",
      content: "Potrai confrontarti con mentor dedicati, avrai feedback personalizzati sui tiroci virtuali svolti e potrai confrontarti con professionisti per fargli domande sul loro lavoro. Il nostro team è sempre disponibile per aiutarti nel tuo percorso."
    }
  ];

  return (
    <div className="min-h-screen">
      <Toaster />
      
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "nav-blur border-b" : ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-gradient">Labirinth</div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#problema" className="text-gray-600 hover:text-purple-600 transition-colors">Il Problema</a>
              <a href="#servizi" className="text-gray-600 hover:text-purple-600 transition-colors">I Nostri Servizi</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
              <a href="/test-inizio" className="text-gray-600 hover:text-purple-600 transition-colors">Test di Orientamento</a>
            </nav>

            <div className="hidden md:block">
              <Button
                onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
              >
                Lista d'attesa
              </Button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#problema" className="block text-gray-600">Il Problema</a>
                <a href="#servizi" className="block text-gray-600">I Nostri Servizi</a>
                <a href="#faq" className="block text-gray-600">FAQ</a>
                <a href="/test-inizio" className="block text-gray-600">Test di Orientamento</a>
                <Button
                  onClick={() => {
                    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                >
                  Lista d'attesa
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-purple-100 text-purple-800">
              Presto disponibile
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Trova il lavoro che ti <span className="text-gradient">appassiona</span> e costruisci il percorso per raggiungerlo
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Un nuovo modo di fare orientamento professionale per chi è in cerca di soddisfazione lavorativa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 w-full sm:w-auto"
                onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
              >
                Iscriviti alla lista d'attesa
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white w-full sm:w-auto"
                onClick={() => document.getElementById('servizi').scrollIntoView({ behavior: 'smooth' })}
              >
                Scopri come funziona
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-16">
          <button
            onClick={() => document.getElementById('problema').scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center gap-2"
          >
            Scopri di più
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Il problema</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Le sfide dei lavoratori di oggi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Il mondo del lavoro è in continua evoluzione e trovare un percorso professionale soddisfacente è una sfida per molti giovani professionisti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm card-hover"
              >
                <div className="mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">La nostra soluzione</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Labirinth ti guida verso una carriera appagante
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Abbiamo creato un percorso completo per aiutarti a scoprire, esplorare e costruire una carriera che ti soddisfi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm card-hover"
            >
              <Brain className="h-12 w-12 text-[#8B5CF6] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Introspezione</h3>
              <p className="text-gray-600">
                Scopri attraverso un test psico-attitudinale quali lavori concreti sono più in linea con le tue attitudini, i tuoi interessi e i tuoi valori
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm card-hover"
            >
              <Video className="h-12 w-12 text-[#0EA5E9] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Esplorazione</h3>
              <p className="text-gray-600">
                Esplora i lavori emersi dal test attraverso interviste a professionisti che quei lavori li svolgono giornalmente e diverse informazioni riguardo i trend, le posizioni aperte, ecc.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm card-hover"
            >
              <Briefcase className="h-12 w-12 text-[#8B5CF6] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Creazione</h3>
              <p className="text-gray-600">
                Impara le competenze necessarie e mettile in pratica in esperienze di lavoro virtuali, svolgendo progetti reali creati in collaborazione con le aziende.
              </p>
            </motion.div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Presto disponibile</Badge>
            <h3 className="text-2xl font-bold mb-4">Supera l'indecisione e inizia la tua carriera con noi!</h3>
            <p className="text-gray-600 mb-6">
              Unisciti a Labirinth e trasforma la tua carriera. Iscriviti ora alla lista d'attesa per essere tra i primi a provare la piattaforma.
            </p>
            <Button
              size="lg"
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
              onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            >
              Unisciti ora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials & CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Il tuo futuro</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Con Labirinth, avrai accesso a:
              </h2>
              <ul className="space-y-4">
                {[
                  "Un test personalizzato che ti suggerisce i 5 lavori più in linea con le tue risposte e le tue caratteristiche",
                  "Video interviste con professionisti che ti racconteranno cosa significa davvero svolgere quei ruoli ogni giorno",
                  "Schede informative dettagliate con stipendio medio, competenze richieste, trend di mercato e offerte di lavoro reali",
                  "Simulazioni pratiche e mini-progetti per metterti alla prova e capire se quel ruolo fa per te",
                  "Supporto nel percorso grazie alla possibilità di confrontarti con professionisti o mentor esperti"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6">Cosa dicono di noi</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    "Grazie a Labirinth ho scoperto un lavoro che mi piace davvero e adesso sto focalizzando le mie ricerche."
                  </p>
                  <p className="font-semibold">Marco B.</p>
                  <p className="text-sm text-gray-500">Laureato in Economia</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    "I tirocini virtuali mi hanno dato l'esperienza pratica che cercavo per iniziare la mia carriera."
                  </p>
                  <p className="font-semibold">Laura M.</p>
                  <p className="text-sm text-gray-500">Laureata in Ingegneria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Lista d'attesa</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unisciti a Labirinth
              </h2>
              <p className="text-xl text-gray-600">
                Iscriviti alla lista d'attesa per essere tra i primi a provare la piattaforma.
              </p>
            </div>

            {showThankYou ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-xl shadow-sm text-center"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Grazie per esserti iscritto!</h3>
                <p className="text-gray-600 mb-6">
                  Ti abbiamo inviato una email di conferma. Ti contatteremo presto con ulteriori informazioni.
                </p>
                <Button
                  onClick={() => setShowThankYou(false)}
                  className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                >
                  Iscrivi un altro account
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Nome e Cognome *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <textarea
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] min-h-[100px]"
                    placeholder="Messaggio (opzionale)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Invio in corso..." : "Iscriviti alla lista d'attesa"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Domande frequenti</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hai delle domande?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ecco alcune risposte alle domande più comuni su Labirinth.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">Labirinth</h3>
              <p className="text-gray-400">
                Aiutiamo i giovani lavoratori a trovare la loro strada nel mondo del lavoro.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contatti</h4>
              <p className="text-gray-400">info@labirinth.it</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/labirinth" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Link utili</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#problema" className="text-gray-400 hover:text-white">
                    Il Problema
                  </a>
                </li>
                <li>
                  <a href="#servizi" className="text-gray-400 hover:text-white">
                    I Nostri Servizi
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Labirinth. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/test-inizio" element={<TestStart />} />
        <Route path="/test-orientamento" element={<OrientationTest />} />
        <Route path="/risultati-test" element={<TestResults />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
