import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import useCalcul from "@/hooks/useCalcul"
import { useState } from "react"

const formSchema = z.object({
  weight: z.string().refine(value => {
    const numberValue = parseInt(value);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 1000;
  }, {
    message: "Le poids doit être un nombre entre 0 et 1000 kg.",
    path: ["weight"]
  }).transform(value => parseInt(value)),

  size: z.string().refine(value => {
    const numberValue = parseInt(value);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 300;
  }, {
    message: "La taille doit être un nombre entre 0 et 300 cm.",
    path: ["size"]
  }).transform(value => parseInt(value)),

  age: z.string().refine(value => {
    const numberValue = parseInt(value);
    return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 150;
  }, {
    message: "L'âge doit être un nombre entre 0 et 150 ans.",
    path: ["age"]
  }).transform(value => parseInt(value)),

  gender: z.enum(["male", "female"], {
    required_error: "Le genre est requis."
  }),

  activity: z.enum(["sedentary", "lightly", "moderately", "very", "super"], {
    required_error: "Le niveau d'activité est requis."
  }),

  goal: z.enum(["lose", "maintain", "gain"], {
    required_error: "L'objectif est requis."
  })
});

export default function FormCal() {
  const [cal, setCal] = useState<number | null>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit"
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const calories = useCalcul(values)
    setCal(calories)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl sm:p-6 lg:p-8 md:border-2 rounded-md bg-white">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionne ton genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Entre ton poids en kg" {...field} />
                  <Toggle aria-label="kg" variant="outline" disabled>
                    kg
                  </Toggle>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taille</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Entre ta taille en cm" {...field} />
                  <Toggle aria-label="cm" variant="outline" disabled>
                    cm
                  </Toggle>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Entre ton age en années" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau d'accivité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionne ton niveau d'acitivité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedentary">Sédentaire (peu ou pas d'exercice)</SelectItem>
                  <SelectItem value="slightly">Légèrement actif (exercice léger/sports 1-3 jours/semaine)</SelectItem>
                  <SelectItem value="moderately">Modérément actif (exercice modéré/sports 3-5 jours/semaine)</SelectItem>
                  <SelectItem value="very">Très actif (exercice intense/sports 6-7 jours/semaine)</SelectItem>
                  <SelectItem value="super">Super actif (exercice très intense, travail physique ou entraînement biquotidien)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionne ton objectif" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lose">Perte de poids (-250 kcal)</SelectItem>
                  <SelectItem value="maintain">Maintenance de poids (aucun changement)</SelectItem>
                  <SelectItem value="gain">Prise de poids (+250 kcal)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {cal && <FormMessage>Vous devez consomer {~~cal} kcal</FormMessage>}
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  )
}