import { Mapping, MappingCollection } from "./MappingCollection";

export class Co2EmissionsMapper {
    constructor(private isChecked: (id: string) => boolean) {
    }

    calculateTemperature(mappings: MappingCollection, todayMode: boolean): number {
        const emissions = todayMode ? 0 : this.cumulateCo2Emissions(mappings);
        console.log('Cumulated CO2 emissions:', emissions);
        const temperature = this.interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
        console.log('Temperature forecast:', temperature);
        return temperature;
    }

    private cumulateCo2Emissions(mappings: MappingCollection) {
        let cumul_co2 = mappings.year.mapping[0].y;
        const params = mappings.parameters.mapping
        for (let i=0; i<params.length; i++) {
            const checked = this.isChecked(params[i].id);
            if (checked) {
                cumul_co2 += params[i].y;
            }
        }
        return cumul_co2;
    }

    private interpolateMapping(mappings: Mapping[], x: number): number {
        let upper : Mapping | undefined = undefined;
        let lower : Mapping | undefined = undefined;
        for (let i=0; i<mappings.length; i++) {
            if (mappings[i].x >= x && (upper == undefined || mappings[i].x < upper.x)) {
                upper = mappings[i];
            }
            if (mappings[i].x <= x && (lower == undefined || mappings[i].x > lower.x)) {
                lower = mappings[i];
            }
        }
        if (lower == undefined) {
            if (upper == undefined) {
                throw new Error("No interpolation possible")
            }
            return upper.y;
        }
        if (upper == undefined)
            return lower.y;
        if (upper == lower)
            return upper.y;
        return (x-lower.x)/(upper.x-lower.x)*(upper.y-lower.y)+lower.y;
    }
}