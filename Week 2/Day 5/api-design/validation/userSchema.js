const { z } = require('zod');

const userSchema = z.object({

    name: z.string().min(3),

    email: z.string().email(),

    age: z.number().min(18)

});

module.exports = userSchema;