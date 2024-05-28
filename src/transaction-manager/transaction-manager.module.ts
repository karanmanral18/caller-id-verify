import { Global, Module } from '@nestjs/common';
import { TransactionProviderService } from './transaction-provider/transaction-provider.service';

@Global()
@Module({
  providers: [TransactionProviderService],
  exports: [TransactionProviderService],
})
export class TransactionManagerModule {}
