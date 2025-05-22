import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-sm text-center"
      >
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Grazie per esserti iscritto!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Ti contatteremo presto con ulteriori informazioni su Labirinth.
        </p>
        <div className="space-y-4">
          <p className="text-gray-600">
            Nel frattempo, continueremo a migliorare i nostri servizi:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Test psico-attitudinale personalizzato</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Video-interviste con professionisti</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Tirocini virtuali con progetti reali</span>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <Link to="/">
            <Button className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ThankYou; 