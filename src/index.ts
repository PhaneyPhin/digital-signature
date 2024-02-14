import dotenv from 'dotenv';
dotenv.config();

import { consumeMessage } from './services/consumer';
import { app } from './container';
import { AttestationController } from './controller/attestation.controller';

app({
    Controllers: [AttestationController]
});

consumeMessage()