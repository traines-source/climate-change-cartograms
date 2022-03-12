import csv

max_sealevel = 10
COL_COUNTRY_ID = 0
COL_SUM = 12
COL_PLACE = 0
COL_SCENARIO = 2
COL_VALUE = 7
COL_COUNTRY_NAME = 2

rcps = [
    {"label": "rcp85", "y": 1.5, "coastaldem": {}, "coastaldem_scenario": "K17_rcp85_2100"},
    {"label": "rcp45", "y": 0.9, "coastaldem": {}, "coastaldem_scenario": "K17_rcp45_2100"},
    {"label": "rcp26", "y": 0.6, "coastaldem": {}, "coastaldem_scenario": "K17_rcp26_2100"},
    {"label": "baseline", "y": 0, "coastaldem": {}, "coastaldem_scenario": "Present day"}
]

def get_float(s):
    try:
        f = float(s)
        if f == f:
            return f
        else:
            return 0.0
    except ValueError:
        return 0.0

def read_sealevels():
    impacted_population = {}
    for i in range(max_sealevel):
        impacted_population[i] = {}
        with open('working/flooding_'+str(i)+'_pop.csv', newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter='|', quotechar='"')
            next(reader)
            for row in reader:
                f = get_float(row[COL_SUM])
                if f is not None:
                    impacted_population[i][row[COL_COUNTRY_ID]] = f
    return impacted_population


def get_default_sealevel(rcp):
    return int(round(rcp['y'], 0))

def read_country_codes():
    country_codes = {}
    with open('country_codes.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(reader)
        for row in reader:
            country_codes[row[COL_COUNTRY_NAME]] = row[COL_COUNTRY_ID]
    return country_codes

def read_coastaldem_impacted_population(rcps):
    country_codes = read_country_codes()

    with open('41467_2019_12808_MOESM4_ESM.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in reader:
            for rcp in rcps:
                if rcp['coastaldem_scenario'] == row[COL_SCENARIO] and row[COL_COUNTRY_ID] in country_codes:
                    rcp['coastaldem'][country_codes[row[COL_COUNTRY_ID]]] = float(row[COL_VALUE])
                    break

def adjust_sealevels(default_sealevel, coastaldem_impacted_population, impacted_population_per_country_by_sealevel):
    adjusted_sealevels = [['0', '*', default_sealevel]]
    for country in impacted_population_per_country_by_sealevel[default_sealevel]:
        if country in coastaldem_impacted_population:
            
            target = coastaldem_impacted_population[country] * 1000000
            closest = default_sealevel
            for sealevel in impacted_population_per_country_by_sealevel:
                if abs(impacted_population_per_country_by_sealevel[sealevel][country] - target) < abs(impacted_population_per_country_by_sealevel[closest][country] - target):
                    closest = sealevel
            adjusted_sealevels.append([str(country), str(country), str(closest)])
    return adjusted_sealevels

def write_mapping(adjusted_sealevels, rcp):
    with open('working/'+rcp['label']+'.csv', 'w') as outfile:
        writer = csv.writer(outfile, delimiter=':', quotechar='"')
        for row in adjusted_sealevels:
            writer.writerow(row)

    
read_coastaldem_impacted_population(rcps)
impacted_population_per_country_by_sealevel = read_sealevels()
print(impacted_population_per_country_by_sealevel)
for rcp in rcps:
    default_sealevel = get_default_sealevel(rcp)
    print(default_sealevel)
    coastaldem_impacted_population = rcp['coastaldem']
    print(coastaldem_impacted_population)
    adjusted_sealevels = adjust_sealevels(default_sealevel, coastaldem_impacted_population, impacted_population_per_country_by_sealevel)
    write_mapping(adjusted_sealevels, rcp)

