import Card from "./base/GenericCard"

export const BugYearCard = () => {
    return (
        <Card title="My 'Bug Year'">
        <div>
          <p className="mb-4">
            In 2023, I tried to document 1,500 research-grade iNaturalist observations of Arthropod species in Essex County, Ontario.
          </p>
          <p className="mb-4">
            CBC Afternoon Drive host Allison Devereaux <a className="underline text-blue-900" href="https://www.cbc.ca/listen/live-radio/1-80-afternoon-drive/clip/15991630-a-bug-year">interviewed me</a> about this effort.
          </p>
          <p className="mb-4">
            I reached 615 species (some identifications are still coming in), you can see the data I gathered <a className="underline text-blue-900" href="https://inaturalist.ca/projects/mark-nenadov-s-bug-year-2023">in this inaturalist group</a>.
          </p>
        </div>
      </Card>

    )
}