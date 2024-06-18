"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/controller/address/create.ts
var create_exports = {};
__export(create_exports, {
  create: () => create
});
module.exports = __toCommonJS(create_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number(),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/pg/db.ts
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  connection() {
    return __async(this, null, function* () {
      try {
        this.client = yield this.pool.connect();
      } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        throw new Error(`Error connecting to database:${error}`);
      }
    });
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/pg/address.repository.ts
var AddressRepository = class {
  findAddressByPersonId(personId, page, limit) {
    return __async(this, null, function* () {
      var _a;
      const offset = (page - 1) * limit;
      const query = `
    SELECT address.*, person.*
    FROM address
    JOIN person ON address.person_id = Person.id
    WHERE person.id = $1
    LIMIT $2 OFFSET $3
    `;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        query,
        [personId, limit, offset]
      );
      return (result == null ? void 0 : result.rows) || [];
    });
  }
  create(_0) {
    return __async(this, arguments, function* ({
      street,
      city,
      state,
      zip_code,
      person_id
    }) {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `
      INSERT INTO "address" (street, city, state, zip_code, person_id) VALUES
      ($1, $2, $3, $4, $5)
      `,
        [street, city, state, zip_code, person_id]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
};

// src/use-cases/create-address.ts
var CreateAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  handler(address) {
    return __async(this, null, function* () {
      return this.addressRepository.create(address);
    });
  }
};

// src/use-cases/factory/make-create-address-use-case.ts
function makeCreateAddressUseCase() {
  const addressRepository = new AddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  return createAddressUseCase;
}

// src/http/controller/address/create.ts
var import_zod2 = require("zod");
function create(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      street: import_zod2.z.string(),
      city: import_zod2.z.string(),
      state: import_zod2.z.string(),
      zip_code: import_zod2.z.string(),
      person_id: import_zod2.z.number()
    });
    const { street, city, state, zip_code, person_id } = registerBodySchema.parse(
      request.body
    );
    const createAddressUseCase = makeCreateAddressUseCase();
    const address = yield createAddressUseCase.handler({
      street,
      city,
      state,
      zip_code,
      person_id
    });
    return reply.code(201).send(address);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
