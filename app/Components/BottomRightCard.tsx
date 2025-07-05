import { Card } from "./base/Card"

export const BottomRightCard = () => {
    return (
      <Card title="📚 Reading">
        <Card.Content>
          <p className="text-text-secondary leading-relaxed text-sm">
            I&apos;m an avid reader and you can find me on <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://www.goodreads.com/user/show/4015564-mark-nenadov">Goodreads</a>. I&apos;ve also collected <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://quotes.marknenadov.com">quotes from my reading</a>.
          </p>
          <div className="font-semibold text-base text-text-primary mb-2">
          📷 Photography
          </div>

          <p className="text-text-secondary leading-relaxed text-sm">
            My wildlife photography has been used by <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://www.smithsonianmag.com/smart-news/can-snakes-recognize-themselves-one-species-has-passed-a-modified-mirror-test-based-on-smell-180984088/">Smithsonian Magazine</a>, <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://ontarionature.org/flying-northwards-again-blog/">Ontario Nature</a>, <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://dnr.maryland.gov/education/Documents/MD-Herps-2021-Envirothon.pdf">Maryland DNR</a>, and <a className="underline text-primary-700 hover:text-primary-600 transition-colors font-medium" href="https://www.fishwildlife.org/application/files/3317/1052/2834/2023-AFWA-AnnualReport-v01F.pdf">Association of Fish & Wildlife Agencies</a>.
          </p>
        </Card.Content>
      </Card>
    )
}