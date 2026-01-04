from django.core.management.base import BaseCommand
from destination.models import Destination


DESTINATIONS = [
    {
        "slug": "nakupenda-sandbank",
        "title": "Nakupenda Sandbank",
        "location": "Zanzibar Archipelago",
        "image": "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1600&h=900&q=80",
        "description": "A breathtaking white sandbank in the Indian Ocean, ideal for swimming, snorkeling, and seafood lunches.",
        "highlight": "Best for relaxation & photography",
        "duration": "4-6 Hours",
        "best_time": "Sunrise & Low Tide",
    },
    {
        "slug": "mnemba-atoll",
        "title": "Mnemba Atoll",
        "location": "North Zanzibar",
        "image": "https://media.istockphoto.com/id/872825878/photo/dolphins-around-mnemba-island-off-zanzibar-tanzania.webp",
        "description": "Zanzibar's top snorkeling destination, famous for dolphins and crystal-clear turquoise waters.",
        "highlight": "Best snorkeling & dolphin encounters",
        "duration": "Full Day",
        "best_time": "Morning",
    },
    {
        "slug": "stone-town",
        "title": "Stone Town",
        "location": "Zanzibar City",
        "image": "https://images.unsplash.com/photo-1531168556467-80a3b279834b",
        "description": "A UNESCO World Heritage maze of Swahili culture, Arabian architecture, markets, and centuries of history.",
        "highlight": "Culture, architecture & history",
        "duration": "3–5 Hours",
        "best_time": "Afternoon & Sunset",
    },
    {
        "slug": "prison-island",
        "title": "Prison Island (Changuu)",
        "location": "West Zanzibar",
        "image": "https://media.istockphoto.com/id/506448196/photo/boat-near-chumbe-island-zanzibar-tanzania.jpg",
        "description": "A tropical escape famous for giant Aldabra tortoises, turquoise waters, snorkeling, and colonial history.",
        "highlight": "Giant tortoises & snorkeling",
        "duration": "2–4 Hours",
        "best_time": "Morning",
    },
    {
        "slug": "jozani-forest",
        "title": "Jozani Forest National Park",
        "location": "South Zanzibar",
        "image": "https://media.istockphoto.com/id/1140174416/photo/mangrove-forest-in-zanzibar-tanzania-africa.jpg",
        "description": "Zanzibar's only national park — home to rare red colobus monkeys, mangrove boardwalks, and tropical wildlife.",
        "highlight": "Red colobus monkeys & mangrove walk",
        "duration": "2–3 Hours",
        "best_time": "Morning",
    },
    {
        "slug": "kae-beach",
        "title": "Kae Beach Sunset Paradise",
        "location": "Michamvi Peninsula, South Zanzibar",
        "image": "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d",
        "description": "One of Zanzibar's most magical sunset beaches — calm tides, barefoot relaxation, cocktails, and Indian Ocean views.",
        "highlight": "Unforgettable sunset views & beach bars",
        "duration": "Half Day – Full Day",
        "best_time": "Sunset",
    },
]


class Command(BaseCommand):
    help = "Load initial destinations data"

    def handle(self, *args, **kwargs):
        created = 0

        for data in DESTINATIONS:
            obj, is_created = Destination.objects.get_or_create(
                slug=data["slug"],
                defaults=data
            )
            if is_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(f"✅ {created} destinations inserted successfully.")
        )
