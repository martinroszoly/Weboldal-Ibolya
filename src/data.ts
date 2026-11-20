export type IconName = 'ledger' | 'people' | 'workflow' | 'folder' | 'shield' | 'sparkle'

export type Service = {
  id: string
  icon: IconName
  title: string
  shortDescription: string
  description: string
  details: string[]
}

export const navigation = [
  { label: 'Főoldal', href: '/' },
  { label: 'Rólam', href: '/rolam' },
  { label: 'Szolgáltatások', href: '/szolgaltatasok' },
  { label: 'Hasznos információk', href: '/informaciok' },
  { label: 'Kapcsolat', href: '/kapcsolat' },
]

export const services: Service[] = [
  {
    id: 'konyvelesi-tamogatas',
    icon: 'ledger',
    title: 'Könyvelési támogatás',
    shortDescription: 'Rendszerezett háttér az egyéni vállalkozás mindennapjaihoz.',
    description:
      'Az egyéni vállalkozással kapcsolatos könyvelési feladatok átláthatóbbá tételét segítő együttműködés, a pontosan egyeztetett feladatkör szerint.',
    details: [
      'Dokumentumok és bizonylatok rendszerezésének támogatása',
      'A választott adózási és működési forma áttekintése egyeztetés alapján',
      'A szükséges adatok és következő lépések közös tisztázása',
    ],
  },
  {
    id: 'berszamfejtes',
    icon: 'people',
    title: 'Bérszámfejtési támogatás',
    shortDescription: 'A munkabérhez kapcsolódó adminisztráció rendezettebb folyamata.',
    description:
      'A bérszámfejtéshez kapcsolódó feladatok köre, a szükséges adatok és a kapcsolattartás rendje előzetes egyeztetés alapján állítható össze.',
    details: [
      'Havi adatszolgáltatás és dokumentumok áttekintése',
      'Belépéshez, kilépéshez és változásokhoz kapcsolódó adminisztráció',
      'A pontos folyamat és az alkalmazott rendszer egyeztetése',
    ],
  },
  {
    id: 'ugyviteli-adminisztracio',
    icon: 'workflow',
    title: 'Ügyviteli adminisztráció',
    shortDescription: 'Átgondoltabb feladatkezelés és követhetőbb ügyintézés.',
    description:
      'A vállalkozás adminisztratív folyamataihoz kapcsolódó, előre meghatározott ügyviteli feladatok támogatása.',
    details: [
      'Dokumentumok, teendők és határidők áttekintésének támogatása',
      'Kapcsolattartás és információk rendszerezése',
      'Ismétlődő adminisztratív feladatok folyamatba rendezése',
    ],
  },
  {
    id: 'dokumentum-rendszerezes',
    icon: 'folder',
    title: 'Dokumentum- és folyamatrendezés',
    shortDescription: 'Tiszta kiindulópont a következő döntésekhez.',
    description:
      'Ha sokféle dokumentum, teendő vagy kérdés gyűlt össze, egy közös áttekintéssel könnyebb kijelölni a következő lépéseket.',
    details: [
      'A meglévő dokumentumok és információk csoportosítása',
      'Hiányzó adatok és tisztázandó pontok listázása',
      'A későbbi együttműködéshez illeszkedő munkarend előkészítése',
    ],
  },
]

export const trustPoints = [
  {
    icon: 'shield' as IconName,
    title: 'Átlátható keretek',
    text: 'A közös feladatkör és a következő lépések előre egyeztethetők.',
  },
  {
    icon: 'sparkle' as IconName,
    title: 'Közérthető egyeztetés',
    text: 'A szakmai kérdésekhez is emberi, követhető kommunikáció társul.',
  },
  {
    icon: 'workflow' as IconName,
    title: 'Rendszerezett folyamatok',
    text: 'A dokumentumok és teendők rendezett háttérben kezelhetők.',
  },
  {
    icon: 'people' as IconName,
    title: 'Együttműködésre építve',
    text: 'A megoldás a vállalkozás aktuális helyzetéhez igazítható.',
  },
]

export const informationCards = [
  {
    icon: 'folder' as IconName,
    title: 'Készülj fel az egyeztetésre',
    text: 'Érdemes egy helyre gyűjteni a vállalkozás alapadatait, a felmerült kérdéseket és a rendelkezésre álló dokumentumokat.',
  },
  {
    icon: 'workflow' as IconName,
    title: 'Tartsd követhetően a teendőket',
    text: 'Egy egyszerű lista is sokat segít abban, hogy a visszatérő feladatok és a tisztázandó pontok ne vesszenek el.',
  },
  {
    icon: 'shield' as IconName,
    title: 'Kérdezz időben',
    text: 'Ha egy döntésnek könyvelési vagy ügyviteli következménye lehet, érdemes még a megvalósítás előtt egyeztetni.',
  },
]
