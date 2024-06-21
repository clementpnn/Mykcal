import H2 from "@/components/typography/h2"
import { createFileRoute } from "@tanstack/react-router"
import Lead from "@/components/typography/Lead"
import FormCal from "@/components/form/form"

export const Route = createFileRoute("/")({
  component: Home
})

function Home() {
  return (
    <>
      <H2 className="block mt-40 text-center">Optimisez votre bien-être avec le calculateur de calories personnalisé</H2>
      <Lead className="block mt-4 mb-28 text-center">Entrez vos informations pour découvrir combien de calories vous devriez consommer chaque jour.</Lead>
      <FormCal />
    </>
  )
}