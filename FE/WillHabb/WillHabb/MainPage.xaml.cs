using Plugin.LocalNotification;

namespace WillHabb
{
    public partial class MainPage : ContentPage
    {
        int count = 0;
        public List<Food> Artikli { get; set; }

        public MainPage()
        {
            InitializeComponent();

            Artikli = new List<Food>
            {
                new Food {
                    Naslov = "KIA XCeed KIA X Ceed Silber 1.0 TGDI| AUTO WIEN MITTE Benzin, Schaltgetriebe, gültiges Pickerl, Gewährleistung, Garantie",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/kia-xceed-kia-x-ceed-silber-1-0-tgdi-auto-wien-mitte-1844923278/",
                    Slika = "https://cache.willhaben.at/mmo/8/184/492/3278_1195504124_hoved.jpg",
                    Godina = "12 km",
                    Kilometraza = "116 PS (85 kW)",
                    Snaga = null,
                    Lokacija = "1020 Wien, 02. Bezirk, Leopoldstadt",
                    Privatno = "Auto-Wienmitte Steiner & Partner",
                    Cijena = "€ 25.690"
                },

                new Food {
                    Naslov = "BMW 3er-Reihe E46 318ci Öamtc Pickerl Benzin, Schaltgetriebe, gültiges Pickerl",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/bmw-3er-reihe-e46-318ci-oeamtc-pickerl-1371756557/",
                    Slika = "https://cache.willhaben.at/mmo/7/137/175/6557_-2001607726_hoved.jpg",
                    Godina = "2000 EZ",
                    Kilometraza = "136.000 km",
                    Snaga = "118 PS (87 kW)",
                    Lokacija = "1220 Wien, 22. Bezirk, Donaustadt",
                    Privatno = "Privat",
                    Cijena = "€ 7.900"
                },

                new Food {
                    Naslov = "Peugeot 3008 1,6 BlueHDi 120 S&S EAT6 GT Line Diesel, Automatik, gültiges Pickerl, Gewährleistung",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/peugeot-3008-1-6-bluehdi-120-s-s-eat6-gt-line-1765671421/",
                    Slika = "https://cache.willhaben.at/mmo/1/176/567/1421_-379132529_hoved.jpg",
                    Godina = "2017 EZ",
                    Kilometraza = "86.900 km",
                    Snaga = "120 PS (88 kW)",
                    Lokacija = "1230 Wien, 23. Bezirk, Liesing",
                    Privatno = "FAST - CARS",
                    Cijena = "€ 15.991"
                },

                new Food {
                    Naslov = "VW T-Roc 2.0 TDI 4motion Style DSG Diesel, Automatik, Gewährleistung",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/vw-t-roc-2-0-tdi-4motion-style-dsg-852390951/",
                    Slika = "https://cache.willhaben.at/mmo/1/852/390/951_-699346271_hoved.jpg",
                    Godina = "2022 EZ",
                    Kilometraza = "15.500 km",
                    Snaga = "150 PS (110 kW)",
                    Lokacija = "5090 Lofer",
                    Privatno = "Georg Schmiderer GmbH",
                    Cijena = "€ 32.990"
                },

                new Food {
                    Naslov = "Mercedes-Benz S-Klasse S 500 Coupé C217 - 4MATIC - #Vollausstattung# -... Benzin, Automatik, gültiges Pickerl, Gewährleistung",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/mercedes-benz-s-klasse-s-500-coupe-c217-4matic-vollausstattung-1079044998/",
                    Slika = "https://cache.willhaben.at/mmo/8/107/904/4998_-446701228_hoved.jpg",
                    Godina = "2014 EZ",
                    Kilometraza = "199.000 km",
                    Snaga = "455 PS (335 kW)",
                    Lokacija = "4770 Andorf",
                    Privatno = "EC Automobile e.U.",
                    Cijena = "€ 49.990"
                },

                new Food {
                    Naslov = "KIA PV5 71,2kWh Earth Plus Elektro, Automatik, Gewährleistung, Garantie",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/kia-pv5-71-2kwh-earth-plus-983854835/",
                    Slika = null,
                    Godina = "2025 EZ",
                    Kilometraza = "8 km",
                    Snaga = "163 PS (120 kW)",
                    Lokacija = "9020 Klagenfurt, 01.Bez.:Innere Stadt",
                    Privatno = "Sintschnig Gesellschaft mbH | Klagenfurt",
                    Cijena = "€ 42.490"
                },

                new Food {
                    Naslov = "BMW 5er-Reihe 3.0 540ixd Benzin, Automatik, gültiges Pickerl, Garantie",
                    Url = "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/bmw-5er-reihe-3-0-540ixd-1687723820/",
                    Slika = "https://cache.willhaben.at/mmo/0/168/772/3820_1758000155_hoved.jpg",
                    Godina = "2019 EZ",
                    Kilometraza = "121.000 km",
                    Snaga = "340 PS (250 kW)",
                    Lokacija = "1020 Wien, 02. Bezirk, Leopoldstadt",
                    Privatno = "Privat",
                    Cijena = "€ 41.000"
                }
            };


            BindingContext = this;

        }

        async private void OtvoriWillHaben(object sender, EventArgs e)
        {
            var button = sender as Button;

            if (button == null)
                return;

            // Прима параметар са Binding-a
            var url = button.CommandParameter as string;

            if (!string.IsNullOrEmpty(url))
            {
                /*if (await Launcher.Default.CanOpenAsync(url))
                {*/
                    // Open the URL
                    await Launcher.Default.OpenAsync(url);
                /*}
                else
                {
                    // Optionally, handle cases where the URL cannot be opened
                    // For example, display an alert to the user.
                    await DisplayAlert("Error", "Could not open the URL.", "OK");
                }*/
            }
        }

        private async void Button_Clicked(object sender, EventArgs e)
        {
            await DisplayAlert("Pozdrac", "djs", "jiasdf");

            // ✅ Провера дозволе за нотификације на Android 13+
            if (DeviceInfo.Platform == DevicePlatform.Android && DeviceInfo.Version.Major >= 13)
            {
                var status = await Permissions.RequestAsync<Permissions.PostNotifications>();
                if (status != PermissionStatus.Granted)
                {
                    await DisplayAlert("Error", "Notifications permission denied", "OK");
                    return; // ако није дозвољено, не шаљемо нотификацију
                }
            }

            // Слање локалне нотификације
            var request = new NotificationRequest
            {
                NotificationId = 100,
                Title = "Test",
                Description = "Ovo je test notifikacija",
            };

            await LocalNotificationCenter.Current.Show(request);
        }

    }

}
