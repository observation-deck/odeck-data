import { z } from 'zod';

// Manufacturer Reference Schema
export const ManufacturerRefSchema = z.enum([
  "AEGS", "ANVL", "XIAN", "XNAA", "ARGO", "BANU", "CNOU", "CRUS", 
  "DRAK", "ESPR", "GAMA", "KRIG", "MRAI", "MISC", "ORIG", "RSI", 
  "VNCL", "GRIN", "TMBL"
]);

// Hard Point Type Schema
export const HardPointTypeSchema = z.enum([
  'Tractor', 'Ballistic', 'Distortion', 'Laser', 'EMP', 'Shield', 
  'Missile', 'Bomb', 'QD', 'QED', 'Salvage Head', 'Medical', 
  'Mining Beam', 'Empty'
]);

// Hard Point Type Schema
export const StateSchema = z.enum([
  'Flight Ready', 'In Concept'
]);

// Manufacturer Schema
export const ManufacturerSchema = z.object({
  ref: ManufacturerRefSchema,
  name: z.string().min(3),
  description: z.string()
});

// Dimensions Schema
export const DimensionsSchema = z.object({
  w: z.number().positive(),
  l: z.number().positive(),
  h: z.number().positive()
});

// Hardpoint Schema
export const HardpointSchema = z.object({
  type: HardPointTypeSchema,
  size: z.number().int().nonnegative().max(10), // for medical this would be equivalent of tier
  count: z.number().int().positive()
});

// Rotation Schema
export const RotationSchema = z.object({
  roll: z.number().positive(),
  yaw: z.number().positive(),
  pitch: z.number().positive()
});

// Prices Schema
export const PricesSchema = z.object({
  pledge: z.number().positive().nullable(),
  inGame: z.number().positive().nullable()
});

export const FlightCharacteristics = z.object({
  scmSpeed: z.number().positive(),
  maxSpeed: z.number().positive(),
  rotation: RotationSchema,
});

// Ship Schema
export const ShipSchema = z.object({
  name: z.string().min(2), // The ships in game name
  ref: z.string().min(3), // Internal name - used in data.p4k
  description: z.string().nullable(),
  size: z.number().int().positive(), // 1-6 xs - xxl
  cargo: z.number().int().nonnegative(), // if no cargo 0
  hydrogenFuel: z.number().positive().nullable(), // null for concept and ground vehicle
  qtFuel: z.number().positive().nullable(), // null for concept, ground vehicle and snub
  minCrew: z.number().int().positive(), // if none then assume min is same as max
  maxCrew: z.number().int().positive(),
  flightCharacteristics: FlightCharacteristics.nullable(), // null for concept ships
  career: z.string().min(3),
  role: z.string().min(3),
  dimensions: DimensionsSchema,  // for now prefer in flight dimensions - TODO look at Hull series
  manufacturer: ManufacturerRefSchema, 
  hp: z.number().positive().nullable(),  // null for concepts
  mass: z.number().positive().nullable(), // null for concepts
  prices: PricesSchema, // not nullable, individual prices are null if not available
  conceptDate: z.string().date(), // e.g. 2023-05-25
  weapons: z.array(HardpointSchema).optional(),
  shields: z.array(HardpointSchema).optional(),
  missiles: z.array(HardpointSchema).optional(),
  accessories: z.array(HardpointSchema).optional(),
  state: StateSchema,
});

// Infer TypeScript types from schemas (these will match your original interfaces)
export type ManufacturerRef = z.infer<typeof ManufacturerRefSchema>;
export type HardPointType = z.infer<typeof HardPointTypeSchema>;
export type Manufacturer = z.infer<typeof ManufacturerSchema>;
export type Dimensions = z.infer<typeof DimensionsSchema>;
export type Hardpoint = z.infer<typeof HardpointSchema>;
export type Rotation = z.infer<typeof RotationSchema>;
export type Prices = z.infer<typeof PricesSchema>;
export type Ship = z.infer<typeof ShipSchema>;

// Validation functions
export const validateShip = (data: unknown): Ship => {
  return ShipSchema.parse(data);
};

export const validateShips = (data: unknown[]): Ship[] => {
  return data.map((item, index) => {
    try {
      return ShipSchema.parse(item);
    } catch (error) {
      throw new Error(`Ship validation failed at index ${index}: ${error}`);
    }
  });
};

// Safe validation (returns success/error instead of throwing)
export const safeValidateShip = (data: unknown) => {
  return ShipSchema.safeParse(data);
};

export const safeValidateShips = (data: unknown[]) => {
  return data.map((item, index) => ({
    index,
    result: ShipSchema.safeParse(item)
  }));
};