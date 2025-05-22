import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const TestStart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fieldOfStudy.trim()) {
      toast({
        title: "Errore",
        description: "Per favore, indica il tuo campo di studi.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('field_of_study', fieldOfStudy);
    setIsReady(true);
  };

  const startTest = () => {
    navigate('/test-orientamento');
  };

  if (isReady) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🎉 Benvenuto/a nel percorso per il tuo futuro professionale con Labirinth!
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-600 mb-6">
                🌟 Il nostro percorso di orientamento è pensato per guidarti passo passo verso una carriera appassionante e su misura per le tue predisposizioni e ambizioni.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔎 Ecco cosa ti aspetta:
              </h2>

              <div className="space-y-4 text-gray-600">
                <p>
                  1️⃣ Test psico-attitudinale – Partiamo con un test per esplorare i tuoi interessi, abilità e aspirazioni.
                </p>
                <p>
                  2️⃣ Scopri il lavoro ideale per te – Dal risultato del test avrai un'idea delle carriere che potrebbero essere migliori per te! Troverai una descrizione completa dei ruoli trovati, con relativi dettagli come le prospettive salariali, e avrai accesso a video di professionisti che condividono le loro esperienze reali.
                </p>
                <p>
                  3️⃣ Minicorso + Simulazione virtuale – Capirai quali sono le competenze chiave del percorso professionale scelto, con spiegazioni pratiche e accessibili. Farai pratica di queste competenze in una simulazione virtuale di un progetto reale, al termine della quale avrai capito cosa significa svolgere quel ruolo.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={startTest}
                className="bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Inizia il Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Test di Orientamento
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                Qual è il tuo campo di studi o il settore in cui ti sei formato?
              </label>
              <Input
                id="fieldOfStudy"
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder="Es. Ingegneria, Economia, Psicologia, ecc."
                className="w-full"
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Continua
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestStart; 