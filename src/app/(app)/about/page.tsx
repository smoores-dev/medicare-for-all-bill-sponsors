import { Anchor, List, ListItem, Stack, Text, Title } from "@mantine/core"

export default async function About() {
  return (
    <Stack align="stretch">
      <Title order={2} className="text-4xl md:text-5xl lg:text-6xl">
        About
      </Title>
      <Title order={3}>What is the Medicare for All Act?</Title>
      <Text>
        Medicare for All, also known as the Expanded and Improved Healthcare
        Act, or the United States National Healthcare Act is a proposal to
        establish a universal, single-payer health care system in the United
        States, similar to the ones in Canada and{" "}
        <Anchor
          className="font-black"
          href="https://www.vox.com/health-care/2020/1/13/21028702/medicare-for-all-taiwan-health-insurance"
        >
          Taiwan
        </Anchor>
        .
      </Text>
      <Title order={3}>What does it do?</Title>
      <List listStyleType="disc">
        <ListItem>
          Creates a single-payer, national health insurance program to provide
          everyone in America with comprehensive health care coverage,{" "}
          <strong>free at the point of service</strong>.
        </ListItem>
        <ListItem>
          No networks, no premiums, no deductibles, no copays, no surprise
          bills.
        </ListItem>
        <ListItem>
          <strong>Expands and improves Medicare</strong> to include: include
          dental, hearing, vision, and home- and community-based long-term care,
          in-patient and out-patient services, mental health and substance abuse
          treatment, reproductive and maternity care, prescription drugs, and
          more.
        </ListItem>
        <ListItem>
          Stops the pharmaceutical industry from ripping off the American people
          by making sure that no one in America pays over $200 a year for the
          medicine they need by capping what Americans pay for prescription
          drugs.
        </ListItem>
        <ListItem>
          Saves{" "}
          <Anchor
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8572548/"
            className="font-black"
          >
            over 400 billion dollars annually and approximately 68,000 American
            lives
          </Anchor>{" "}
          a year.
        </ListItem>
      </List>

      <Title order={3}>How would we pay for it?</Title>
      <List listStyleType="disc">
        <ListItem>Tax the rich</ListItem>
        <ListItem>
          Replace premiums, deductibles, and co-pays with a modest increase in
          the Medicare payroll tax on individuals and employers, ultimately
          saving over 90% of Americans thousands of dollars a year.
        </ListItem>
        <ListItem>
          Eliminate health insurance industry profits and overhead and use the
          savings to fund national healthcare.
        </ListItem>
      </List>
      <Title order={3}>Does it have any support?</Title>
      <Text>
        Yes! The Medicare for All Act has over 100 cosponsors in the House of
        Representatives and 14 cosponsors in the Senate. The following national
        organizations have also endorsed Medicare for All:
      </Text>
      <List listStyleType="disc">
        <ListItem>
          Automobile, Aerospace & Agricultural Implement Workers of America
          (UAW)
        </ListItem>
        <ListItem>National Nurses United (NNU)</ListItem>
        <ListItem>
          International Alliance of Theatrical Stage Employees (IATSE)
        </ListItem>
        <ListItem>League of United Latin American Citizens (LULAC)</ListItem>
        <ListItem>
          International Federation of Professional and Technical Engineers
          (IFPTE)
        </ListItem>
        <ListItem>National Union of Healthcare Workers</ListItem>
        <ListItem>Service Employees International Union (SEIU)</ListItem>
        <ListItem>United Mine Workers of America</ListItem>
        <ListItem>
          United Electrical, Radio & Machine Workers of America (UE)
        </ListItem>
        <ListItem>
          National Network for Arab American Communities (NNAAC)
        </ListItem>
        <ListItem>National LGBT Cancer Network</ListItem>
        <ListItem>AIDS Healthcare Foundation</ListItem>
        <ListItem>American Medical Student Association (AMSA)</ListItem>
        <ListItem>National Domestic Workers Alliance</ListItem>
        <ListItem>Muslim Delegates and Allies Coalition</ListItem>
        <ListItem>National Council of Jewish Women</ListItem>
        <ListItem>South Asian Public Health Association</ListItem>
        <ListItem>National Immigration Law Center</ListItem>
        <ListItem>Japanese American Citizens League</ListItem>
        <ListItem>Business Leaders for Health Care Transformation</ListItem>
        <ListItem>
          National Korean American Service & Education Consortium
        </ListItem>
        <ListItem>
          United Church of Christ Justice and Local Church Ministries
        </ListItem>
      </List>
      <Title order={3}>Why hasn’t it passed?</Title>
      <Text>
        Over 100 cosponsors in the House of Representatives and 14 in the Senate
        is great, but Medicare for All needs 218 votes to pass in the House and
        51 to pass in the Senate. Health insurance companies and big
        pharmaceuticals have{" "}
        <Anchor
          href="https://jacobin.com/2024/12/unitedhealthcare-reform-political-lobbying"
          className="font-black"
        >
          spent billions of dollars over decades
        </Anchor>{" "}
        to ensure that they can continue to profit off of people’s illness. They
        spread propaganda and lies to scare Americans about national healthcare.
        They lobby and pay off elected representatives to protect the system of
        for-profit healthcare. The power of the health insurance companies’ big
        money has not yet been matched with the power of a people’s movement.
        This is about to change.
      </Text>
      <Title order={3}>What does it take to pass Medicare For All?</Title>
      <Text>
        <strong>STEP ONE</strong>: The bill is introduced in both chambers of
        congress– the House of Representatives and the Senate.{" "}
      </Text>

      <Text>
        <strong>STEP TWO</strong>: Both bills are referred to the committee that
        deals with the subject of the bill, in this case the Heath, Education,
        Labor, and Pensions committees.
      </Text>

      <Text>
        <strong>STEP THREE</strong>: A majority of the committee must vote for
        the bill. If the Chair of the committee doesn’t support the bill, it
        won’t even come up for a vote.
      </Text>

      <Text>
        <strong>STEP FOUR</strong>: If the bill wins enough votes in committee,
        it goes up for a vote on the floor— meaning among all representatives in
        the House, and all Senators in the Senate. Before the vote, reps and
        senators will debate and edit the bill, changing things they don’t like,
        and adding new amendments.
      </Text>

      <Text>
        <strong>STEP FIVE</strong>: The bills must pass in both the House of
        Representatives and the Senate. If that happens, they must be edited so
        that the version in the House matches the version in the Senate.
      </Text>

      <Text>
        <strong>STEP SIX</strong>: The President of the United States must
        choose to sign the bill into law.
      </Text>

      <Title order={3}>About this site</Title>
      <Text>
        This site was created by volunteers who want to keep the fight for
        Medicare For All in the spotlight and make it easy to check which
        members of Congress support the Medicare For All Act in the House and in
        the Senate.
      </Text>
    </Stack>
  )
}
