# Project_template

# Задание 1. Анализ и планирование

### 1. Описание функциональности монолитного приложения

**Управление отоплением:**

- Пользователи могут удалённо включать/выключать отопление в своих домах.
- Система поддерживает удаленное включение/выключение отопления в домах, которые подключены к системе
- 

**Мониторинг температуры:**

- Пользователи могут просматривать текущую температуру в своих домах через веб-интерфейс.
- Система поддерживает получение данных о температуре с датчиков, установленных в домах.


### 2. Анализ архитектуры монолитного приложения

- Приложение является монолитом. 
- Язык программирования: Golang. 
- Используемая БД: PostrgreSQL.
- Взаимодействие между компонентами происходит синхронно (запросы обрабатываются последовательно)

### 3. Определение доменов и границы контекстов

Домены: управление устройствами отопления, мониторинг температуры

Управление системой отопления:
- подключение/отключение датчиков
- включение/выключение приборов отопления

Мониторинг температуры:
- получение данных датчиков отопления
- управление состоянием датчиков (например сброс показателей и тд.)

### **4. Проблемы монолитного решения**

- Ограниченная масштабируемость. Монолит сложно масштабировать по частям
- Для развертывания необходима остановка всего приложения. Долгие pipelines в случае CI/CD
- Сильная связность функционала. При добавлении функционала новых доменов разработка будет усложняться, так как изменения в одном домене могут влиять на изменения в другом. 
- Относительно низкая надежность. Из-за сильной связности модулей отказ в одном модуле может привести к отказу всего приложения.
- Ограниченность в выборе технологий. Возможно для реализации функционала разных доменов целесообразнее использовать разные технологии. Монолит либо исключет такую возможность, либо ее ограничивает.

### 5. Визуализация контекста системы — диаграмма С4

```markdown
[Диаграмма контекста](https://img.plantuml.biz/plantuml/dpng/bLJ1ZX914BsJy0yj9qnmkNZoj0bwKxDPOpnkPg6pJ38pFMcQkDwGITniri35WpUZ_i1ab3WBBFn2zH_vgXlO1T6i5wQxkkgzLw-wEUoPG9j-75Kh9ZIH56y27NTLloT5IoL6dXlnD0pET11NAqXHgJ1Ad2fZL2mwePPj4wg4Znw4IJlgTsHVHw9hJDfxqcpguEt1MMYw_LFWwJRZ9UQWhUBcSTWET4Uz36KgesRhyQEZA4ZCwnVFct7GCr8ZTD9ISQeIhaYTlchbIEgUIkeCrX0r-a8BcjcFz0lVWd8xf0dlQ_yuQmWgxNjQhazjPaVsaagw5lGDAKk4htZp4ndpsiCDPz29muI1lo9dOZ-W9ASPWzcXe2bduo2d6noKjRycWjZz07yAgf6z02bgx4X0baj2O6wl12smNB2WLSPOKB7IHHDG2fSwHGUN-49o0Re1er2v0yPzl7e7N-FwPhn-3w6t0_UXbVXDEUNCEWE_pMXf1sYdk2CA_4X4U47NhWHkewZSsm2YSyHuXpCKbLZ_0CEAYXqRyBI0El2wryfFdfsRkjF9-ZwvyMnM3JS2Z-ddj-rn3jmXr8sTRtUyWPDxkzeLpxbUpR6CLXVmJolfy_RTOjRjKMJtfzld5iFjSofZRQpCNrDlaty4EoRiojatfNjPj6RSTM7D_Vssn8uzyt_U56zajb6ELlXztM304xS1s0MyuiTN-E5KAuSowU3VuZS0)
```

# Задание 2. Проектирование микросервисной архитектуры

В этом задании вам нужно предоставить только диаграммы в модели C4. Мы не просим вас отдельно описывать получившиеся микросервисы и то, как вы определили взаимодействия между компонентами To-Be системы. Если вы правильно подготовите диаграммы C4, они и так это покажут.

**Диаграмма контейнеров (Containers)**

```markdown
[Диаграмма контейнеров](https://img.plantuml.biz/plantuml/dpng/jLTTQnj757tVNp5T2fL0iIZqgM28BPlOnOrLIoOl1J5QZLTBLxjYTsH7b48jjqr2YqrBeMyDVUYxOgn6iPtDNvZzHprtLfArqifo33QsfBrpvvvpF-QCzJYKF92TbilCbWX3Rejw9pIDJnpFSZiDmPfIjiClYyM07wtOZcnsi2m2o_UayEIAvRUARPTx5E1HA1kkKo-MldXK9jF-rpl55W-b262gbR23Evu8LjhmDJvZ7G-RMmZ2P5Em0zzr_IF7ivaB9yQz1aijEq68Jpu3E7DzYxjk5p4cBES1ZBL6OzCL5A7AxPpPSgp0huZWqB64MM2VXatU5gkRZjsK5QSX6XLwpkMnKhTBlki7gsR93xm3i1B1kjlHcmw0CLeyQZfIsrnX2wzH5S_bQWB2mWJbMqzGT1PIU3C_IoYKVe1gtt3PypiUFDVzvnbSN4tqk-v29dd3g6pjFgkLD_Sgkqzhk_lLdUsdcpcOoo88VIz7RIimzLf5wYh-JRt5-xdgnpqreES2CnSlgM5yh3wCL-EJ-3H-fORg7OCPIzhnEZvXbHP6YJNzLaAdYzwtQkkK5W-wEUjpW2GkMt1XesOmCy--DnX-9XtCyNORliz4dQsrswvZSUdu7j8sl-A7FBG2foqBR4zmIv9nVvkHg_eG_mXML-3v7mYz1xMp0ejVg07i0_MMgKiLWMk4nqWDs4r6wNnPVA93zM6yYi-mlGSJfQatljC9mrzTgo7od6NkWD5Qss5Fk1H7l0k2LDk_iVSIeP8e_OG6KnU4mBJbM8CEO0ABCNy6Sdsz4C41D3LhsXS1dfn0Ovv4HpPheoaaDdXaDwDlFl7fLVsZ2tDE7MJ0Fz7vlyVhCFu9TRo4xHUy3ndzeXYZqWs9qdWbkuHdDA6Iso5RPUc3DykqAT1QpvuYkvLObl2TRj6aLekQf1Eu87OO1frOOjN3W1Gc4UvCMv_6DE-TaUa-n7LppsdGy3YQGdJYruHcCjPlTF6JeRihJHiZE4MH9l9UzCwJCmDg7uSVTe93uRYu3Anf7fKfyxAvn9i-4P4UzJUepAb-_hX-IK72AuFk58lgsBQi9BtHWRoc1kbUtBa26_KStMA-LslK4RUaFxCDBdcTXngmx8VI3aJbcnqD_AykFYNNqoEBZpG70rBQ2IMj0xdKygA3M1XBHRz08I9zB2A8sg8JKyZ8DpxDJoSylhZonW-6iIVSsiReRabK6rBNczFFQHbZrCgCIQCivqymo5DbjghLSWMG2Pv6IgHMlTRkf4haVA5BjrRUnkYWCheS-kB0fLYS3OBzCrAf_g1D-2FfqC9_d5B9B1KiJejdMZflGvwNljl15ob7IiEeRRU1PWZN_L0JlNfrDzGP7ReFuhm4BKHRe3fBMhjCQ1R2PMdBaWop5IMDG10p5_cqbAY_HWUg7x_4_X5E4SeLnJyd8Z8-UYcTm3yGlwi_2OqaHoSoVma_5D3yz3qKKdhY7WebUz8U2YrZq1u2odYChpFq3Uf_)
```

**Диаграмма компонентов (Components)**

Добавьте диаграмму для каждого из выделенных микросервисов.

**Диаграмма кода (Code)**

Добавьте одну диаграмму или несколько.

# Задание 3. Разработка ER-диаграммы

Добавьте сюда ER-диаграмму. Она должна отражать ключевые сущности системы, их атрибуты и тип связей между ними.

# Задание 4. Создание и документирование API

### 1. Тип API

Укажите, какой тип API вы будете использовать для взаимодействия микросервисов. Объясните своё решение.

### 2. Документация API

Здесь приложите ссылки на документацию API для микросервисов, которые вы спроектировали в первой части проектной работы. Для документирования используйте Swagger/OpenAPI или AsyncAPI.

# Задание 5. Работа с docker и docker-compose

Перейдите в apps.

Там находится приложение-монолит для работы с датчиками температуры. В README.md описано как запустить решение.

Вам нужно:

1) сделать простое приложение temperature-api на любом удобном для вас языке программирования, которое при запросе /temperature?location= будет отдавать рандомное значение температуры.

Locations - название комнаты, sensorId - идентификатор названия комнаты

```
	// If no location is provided, use a default based on sensor ID
	if location == "" {
		switch sensorID {
		case "1":
			location = "Living Room"
		case "2":
			location = "Bedroom"
		case "3":
			location = "Kitchen"
		default:
			location = "Unknown"
		}
	}

	// If no sensor ID is provided, generate one based on location
	if sensorID == "" {
		switch location {
		case "Living Room":
			sensorID = "1"
		case "Bedroom":
			sensorID = "2"
		case "Kitchen":
			sensorID = "3"
		default:
			sensorID = "0"
		}
	}
```

2) Приложение следует упаковать в Docker и добавить в docker-compose. Порт по умолчанию должен быть 8081

3) Кроме того для smart_home приложения требуется база данных - добавьте в docker-compose файл настройки для запуска postgres с указанием скрипта инициализации ./smart_home/init.sql

Для проверки можно использовать Postman коллекцию smarthome-api.postman_collection.json и вызвать:

- Create Sensor
- Get All Sensors

Должно при каждом вызове отображаться разное значение температуры

Ревьюер будет проверять точно так же.


