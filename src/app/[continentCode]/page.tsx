import { ObservableEmbed } from "@/components/observableEmbed/server";

export default async function Home({ params }: {params: Promise<{continentCode: string}>}) {
  const { continentCode } = await params;
  return (
    <div>
      <ObservableEmbed
        module={`https://observablehq.observablehq.cloud/olympian-embeds/continent/${continentCode.toUpperCase()}/chart.js`}
        importName="MedalsChart"
      />
    </div>
  );
}
