import Card from "./base/GenericCard"

export const BottomRightCard = () => {
    return (
      <Card title="📚 Reading">
        <div>
          <p className="mb-4 opacity-85">
            I&apos;m  an avid reader and you can find me on <a className="underline text-blue-900" href="https://www.goodreads.com/user/show/4015564-mark-nenadov">Goodreads</a>.  I&apos;ve also collected a number of <a className="underline text-blue-900" href="https://quotes.marknenadov.com">quotes from my reading</a>.
          </p>
          <div className="font-bold text-lg">
          📷 Photography
          </div>

          <p className="mb-4 opacity-85">
            My wildlife photography has been used by various sources, such as <a className="underline text-blue-900" href="https://www.smithsonianmag.com/smart-news/can-snakes-recognize-themselves-one-species-has-passed-a-modified-mirror-test-based-on-smell-180984088/">Smithsonian Magazine</a>, <a className="underline text-blue-900" href="https://ontarionature.org/flying-northwards-again-blog/">Ontario Nature</a>, <a className="underline text-blue-900" href="https://dnr.maryland.gov/education/Documents/MD-Herps-2021-Envirothon.pdf">Maryland DNR</a>, and <a className="underline text-blue-900" href="https://www.fishwildlife.org/application/files/3317/1052/2834/2023-AFWA-AnnualReport-v01F.pdf">Association of Fish & Wildlife Agencies</a>,
                        
          </p>
        </div>
      </Card>
    )
}