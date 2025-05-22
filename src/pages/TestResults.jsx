import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { analyzeTestResults } from '@/lib/chatgpt';
import { testQuestions } from '@/lib/testQuestions';
import { ArrowRight, CheckCircle, GraduationCap, TrendingUp, Clock, Euro, Star, Heart, Target, Zap } from 'lucide-react';

const TestResults = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const answers = JSON.parse(localStorage.getItem('test_answers'));
        if (!answers) {
          navigate('/test-orientamento');
          return;
        }

        const analysisResults = await analyzeTestResults(answers, testQuestions);
        setResults(analysisResults);
      } catch (error) {
        console.error('Errore nell\'analisi:', error);
        toast({
          title: "Errore",
          description: "Si è verificato un errore nell'analisi dei risultati. Riprova più tardi.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analisi in corso...
            </h2>
            <p className="text-gray-600">
              Stiamo analizzando le tue risposte per creare un profilo personalizzato.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Scopri il percorso di carriera più adatto a te
          </h1>

          {/* Profilo */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Il Tuo Profilo
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg">
                {results.profile.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Interessi Principali</h3>
                  </div>
                  <ul className="space-y-2">
                    {results.profile.interests.map((interest, index) => (
                      <li key={index} className="text-purple-800">• {interest}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Stile di Lavoro</h3>
                  </div>
                  <p className="text-blue-800">{results.profile.workStyle}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Valori Chiave</h3>
                  </div>
                  <ul className="space-y-2">
                    {results.profile.values.map((value, index) => (
                      <li key={index} className="text-green-800">• {value}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Aspirazioni</h3>
                  </div>
                  <p className="text-orange-800">{results.profile.aspirations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ruoli Suggeriti */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Ruoli Raccomandati
            </h2>
            <p className="text-gray-600 mb-8">
              Abbiamo selezionato per te {results.suggestedRoles.length} professioni perfettamente in linea con le tue attitudini e aspirazioni. Per ogni ruolo troverai:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">Descrizione</span>
              </div>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Stipendi</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-500" />
                <span className="text-gray-600">Percorso studi</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">Trend mercato</span>
              </div>
            </div>

            <div className="space-y-8">
              {results.suggestedRoles.map((role, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{role.title}</h3>
                      <span className="text-sm font-medium text-purple-600">
                        {role.match}% match
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📌 Descrizione</h4>
                      <p className="text-gray-600">{role.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">💰 Stipendi Medi</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>Junior: {role.salary.junior}</li>
                        <li>Mid-level: {role.salary.mid}</li>
                        <li>Senior: {role.salary.senior}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🎓 Percorso di Studi</h4>
                      <p className="text-gray-600">{role.education}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📈 Situazione del Mercato</h4>
                      <p className="text-gray-600">{role.market}</p>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-2">🗓 Giornata Tipo</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">Mattina</span>
                          </div>
                          <p className="text-gray-600">{role.dailyRoutine.morning}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <span className="font-medium">Pomeriggio</span>
                          </div>
                          <p className="text-gray-600">{role.dailyRoutine.afternoon}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Quale di questi lavori ti ispira di più?
            </h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                👉 Compila il form e accedi al tirocinio virtuale per scoprirlo da vicino! 🚀
              </h3>
              <div className="space-y-4">
                <p className="text-purple-800">
                  <strong>Perché dovresti compilare il form?</strong>
                </p>
                <ul className="space-y-2 text-purple-800">
                  <li>• Ti aiuterà a focalizzarti sul lavoro che senti più affine a te</li>
                  <li>• Avrai l'opportunità di sperimentare attività reali e acquisire competenze pratiche</li>
                  <li>• Potrai arricchire il tuo CV con un'esperienza concreta per distinguerti nel mercato del lavoro</li>
                </ul>
                <div className="pt-4">
                  <a
                    href="https://docs.google.com/forms/d/1OA3INI3nezkzRfLzUapNj93Qn9YaNadARKsRUGfLLGw/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Compila il form <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Torna alla Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults; 