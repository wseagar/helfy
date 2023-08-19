// SCRAPER: visit https://www.eventfinda.co.nz/markets-fairs/events/new-zealand
// run in console:
// console.log(JSON.stringify([...document.querySelectorAll(".card:not(.featured)")].map(elm => {
//     let img = elm.querySelector('img').src;
//     let a = elm.querySelector('a').href;
//     return { img, text: elm.innerText, a }
// })))

const EVENTS_RAW = [
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1833438-792370-34.jpg?v=13",
    text: "Mangonui Craft Market\n\nMangonui Hall, Doubtless Bay, Far North\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2022/mangonui-craft-market5/doubtless-bay",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1871134-806836-34.jpg?v=7",
    text: "Milton Saturday Market\n\nTokomairiro Church, Milton, South Otago\n\nToday 10:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/milton-saturday-market8/milton",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1830310-791057-34.jpg",
    text: "The Little Big Markets Mount Maunganui Winter Series\n\nCoronation Park, Mt Maunganui, Bay of Plenty\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/the-little-big-markets-mount-maunganui-winter-series2/mt-maunganui",
  },

  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1836183-793612-34.jpg",
    text: "Sustainable Market\n\nSir Edmund Hillary Library Papakura, Papakura, Auckland\n\nToday 10:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/sustainable-market/auckland/papakura",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1807958-781557-34.jpg",
    text: "Hornby Indoor Market\n\nSouth Hornby Primary School, Christchurch\n\nToday 10:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/hornby-indoor-market/christchurch",
  },
  {
    img: "https://cdn.eventfinda.co.nz/images/global/sample-images/sample-images-festivals-34.webp?b",
    text: "Hall Market\n\nMaungakaramea Memorial Hall, Whangarei\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/hall-market/whangarei",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1731561-753028-34.jpg?v=2",
    text: "Tamahere Country Market\n\nSt Stephens Anglican Church, Hamilton, Waikato\n\nToday 8:30am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2022/tamahere-country-market/hamilton",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1834599-792902-34.jpg",
    text: "Parnell Saturday Market\n\nParnell Quarter, Parnell, Auckland\n\nToday 8:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/parnell-saturday-market/auckland",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1861554-803784-34.jpg?v=4",
    text: "Book Sale\n\nKuirau Park, Rotorua, Bay of Plenty\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/book-sale/rotorua",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1850022-799821-34.jpg?v=30",
    text: "Huge Pop, Rock, Folk, Jazz & Country Vinyl Record Sale\n\nSt Anne's Hall, Browns Bay, Auckland\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/huge-pop-rock-folk-jazz-country-vinyl-record-sale/auckland/browns-bay",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1866839-805525-34.jpg?v=8",
    text: "Crystal Visions Holistic Market\n\nMilford Senior Citizens Hall, Milford, Auckland\n\nToday 10:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/crystal-visions-holistic-market/auckland/milford",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1808285-781690-34.jpg",
    text: "Matakana Village Farmers' Market\n\nMatakana Village Market Square, Matakana, Auckland\n\nToday 8:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2022/matakana-village-farmers-market/auckland/matakana",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1831648-791566-34.webp",
    text: "The Nelson Market\n\nThe Nelson Market, Nelson, Nelson / Tasman\n\nToday 8:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/the-nelson-market/nelson-tasman",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1849673-799671-34.jpg?v=8",
    text: "Mangawhai Tavern Market\n\nThe Mangawhai Tavern, Mangawhai, Kaipara\n\nToday 8:30am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/mangawhai-tavern-market/mangawhai",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1839447-795090-34.png?v=3",
    text: "Lyttelton Craft and Treasure Market\n\nCollett's Corner, Lyttelton, Christchurch District\n\nToday 9:00am – more dates\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/lyttelton-craft-and-treasure-market/lyttelton",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1870373-806469-34.jpg?v=2",
    text: "Gladrags - The Great Big Spring Clothing Swap\n\nCoronation Park, Mt Maunganui, Bay of Plenty\n\nTomorrow 9:00am\nMarkets and Fairs\n\nBuy Tickets",
    a: "https://www.eventfinda.co.nz/2023/gladrags-the-great-big-spring-clothing-swap/mt-maunganui",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1838802-794799-34.jpg?v=6",
    text: "Glasshouse Market\n\nMorningside Glasshouse, Morningside, Auckland\n\nTomorrow 10:00am\nMarkets and Fairs",
    a: "https://www.eventfinda.co.nz/2023/glasshouse-market/auckland/morningside",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/collection/transformed/1883997-2195-34.png",
    text: "Ebony Lamb - Album Release Tour\n\nBanished Music & Slow Time Records present Ebony Lamb Album Release…",
    a: "https://www.eventfinda.co.nz/tours-festivals/2023/ebony-lamb-album-release-tour",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/collection/transformed/1884034-2194-34.jpg",
    text: "PaeRangi Indigenous Social Enterprise Forum 2023\n\nPaeRangi is a 2-day celebration of Māori Business innovation and…",
    a: "https://www.eventfinda.co.nz/tours-festivals/2023/paerangi-maori-business-innovation-and-ingenuity",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/collection/transformed/1883420-2188-34.jpg",
    text: "Lloyd Cole - NZ Tour\n\nLloyd Cole embarks on his 9th tour of Aotearoa New Zealand to celebrate the…",
    a: "https://www.eventfinda.co.nz/tours-festivals/2023/lloyd-cole-nz-tour",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/collection/transformed/1884490-2196-34.jpg",
    text: "NZ Cherry Blossom Festival\n\nIn addition to the blooms, there is entertainment with different themes on…",
    a: "https://www.eventfinda.co.nz/tours-festivals/2023/nz-cherry-blossom-festival",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1731561-753028-34.jpg?v=2",
    text: "Tamahere Country Market\n\nSt Stephens Anglican Church, Hamilton, Waikato\n\nToday 8:30am  – more dates",
    a: "https://www.eventfinda.co.nz/2022/tamahere-country-market/hamilton",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1834599-792902-34.jpg",
    text: "Parnell Saturday Market\n\nParnell Quarter, Parnell, Auckland\n\nToday 8:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2023/parnell-saturday-market/auckland",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1807958-781557-34.jpg",
    text: "Hornby Indoor Market\n\nSouth Hornby Primary School, Christchurch\n\nToday 10:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2023/hornby-indoor-market/christchurch",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1838802-794799-34.jpg?v=6",
    text: "Glasshouse Market\n\nMorningside Glasshouse, Morningside, Auckland\n\nTomorrow 10:00am",
    a: "https://www.eventfinda.co.nz/2023/glasshouse-market/auckland/morningside",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1830310-791057-34.jpg",
    text: "The Little Big Markets Mount Maunganui Winter Series\n\nCoronation Park, Mt Maunganui, Bay of Plenty\n\nToday 9:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2023/the-little-big-markets-mount-maunganui-winter-series2/mt-maunganui",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1836183-793612-34.jpg",
    text: "Sustainable Market\n\nSir Edmund Hillary Library Papakura, Papakura, Auckland\n\nToday 10:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2023/sustainable-market/auckland/papakura",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1799457-778102-34.jpg?v=3",
    text: "Parnell Farmers' Market\n\nJubilee Building - Parnell Community Centre, Parnell, Auckland\n\nSat 26 Aug 8:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2021/parnell-farmers-market/auckland/parnell",
  },
  {
    img: "https://cdn.eventfinda.co.nz/uploads/events/transformed/1871589-806953-34.jpg",
    text: "The Carterton Monster Annual Book Fair\n\nCarterton Events Centre, Carterton, Wairarapa\n\nToday 10:00am  – more dates",
    a: "https://www.eventfinda.co.nz/2023/the-carterton-monster-annual-book-fair/carterton",
  },
];

type Event_ = {
  img: string;
  text: string;
  a: string;
};

type ParsedEvent = {
  img: string;
  name: string;
  location: string;
  date: string;
  category: string;
  href: string;
};

function parseEvents(events: Event_[]): ParsedEvent[] {
  return events.map((event) => {
    const lines = event.text.split("\n\n");
    console.log(lines);
    return {
      img: event.img,
      name: lines[0].trim(),
      location: lines[1].trim(),
      date: lines[2]?.trim() || "",
      category: lines[3]?.trim() ?? "",
      href: event.a,
    };
  });
}

export const EVENTS = parseEvents(EVENTS_RAW);
