import Card from "./base/GenericCard"

export const BottomRightCard = () => {
    return (
      <Card title="Reading">
        <div>
          <p className="mb-4">
            I&apos;m  an avid reader and you can find me on <a className="underline text-blue-900" href="https://www.goodreads.com/user/show/4015564-mark-nenadov">Goodreads</a>.  I&apos;m also collected a number of <a className="underline text-blue-900" href="https://quotes.marknenadov.com">quotes from my reading</a>.
          </p>
          <div className="font-bold">
            My &quot;Bug Year&quot;
          </div>

          <p className="mb-4">
              In 2023, I documented 659 research-grade iNaturalist Arthropod species in Essex Coujnty, Ontario.
          </p>
          <p className="mb-4">
              CBC Afternoon Drive host Allison Devereaux <a className="underline text-blue-900" href="https://www.cbc.ca/listen/live-radio/1-80-afternoon-drive/clip/15991630-a-bug-year">interviewed me</a> about this effort.
              You can view the data I gathered <a className="underline text-blue-900" href="https://inaturalist.ca/projects/mark-nenadov-s-bug-year-2023">in this inaturalist group</a>.
          </p>
        </div>
      </Card>
    )
}