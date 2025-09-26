import {
  ManufacturerSchema,
  safeValidateShips
} from '../schemas/ship.schemas';
import ships from '../data/ships.json';
import manufacturers from '../data/manufacturers.json';

describe('Ship Data Validation', () => {
  describe('Individual Ship Validation', () => {
    test('all ships match Ship schema', () => {
      const validationResults = safeValidateShips(ships);
      const failures = validationResults.filter(({ result }) => !result.success);

      if (failures.length > 0) {
        console.error('\n=== VALIDATION FAILURES ===');
        failures.forEach(({ index, result }) => {
          if (!result.success) {
            console.error(`\nShip with name ${ships[index].name}:`);
            console.error('Errors:', JSON.stringify(result.error.format(), null, 2));
            console.error('Data:', JSON.stringify(ships[index], null, 2));
          }
        });
      }

      expect(failures).toHaveLength(0);
    });

    test('ships array is valid and non-empty', () => {
      expect(Array.isArray(ships)).toBe(true);
      expect(ships.length).toBeGreaterThan(0);
    });
  });

  describe('Data Consistency', () => {
    test('all ship refs are unique', () => {
      const refs = ships.map(ship => ship.ref);
      const uniqueRefs = new Set(refs);

      if (uniqueRefs.size !== ships.length) {
        const duplicates = refs.filter((ref, index) => refs.indexOf(ref) !== index);
        console.error('Duplicate refs found:', [...new Set(duplicates)]);
      }

      expect(uniqueRefs.size).toBe(ships.length);
    });

    test('all ship names are unique', () => {
      const names = ships.map(ship => ship.name);
      const uniqueNames = new Set(names);

      if (uniqueNames.size !== ships.length) {
        const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
        console.error('Duplicate names found:', [...new Set(duplicates)]);
      }

      expect(uniqueNames.size).toBe(ships.length);
    });

    test('minCrew is always <= maxCrew when present', () => {
      ships.forEach((ship, index) => {
        if (ship.minCrew !== undefined) {
          expect(ship.minCrew).toBeLessThanOrEqual(ship.maxCrew);
        }
      });
    });
  });

  describe('Manufacturer Validation', () => {
    test('all manufacturers match Manufacturer schema', () => {
      manufacturers.forEach((manufacturer, index) => {
        const result = ManufacturerSchema.safeParse(manufacturer);
        if (!result.success) {
          console.error(`Manufacturer at index ${index} failed:`, result.error.format());
        }
        expect(result.success).toBe(true);
      });
    });

    test('all ship manufacturers exist in manufacturers list', () => {
      const manufacturerRefs = new Set(manufacturers.map(m => m.ref));

      ships.forEach((ship, index) => {
        expect(manufacturerRefs.has(ship.manufacturer))
          .toBe(true);
      });
    });

    test('all manufacturer refs are unique', () => {
      const refs = manufacturers.map(m => m.ref);
      const uniqueRefs = new Set(refs);
      expect(uniqueRefs.size).toBe(manufacturers.length);
    });
  });
});