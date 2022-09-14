import {
  PAY_METHOD_ENUM,
  PAY_STATUS_ENUM,
  PG_PROVIDER_ENUM,
} from 'src/common/enums';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * ference: https://docs.iamport.kr/sdk/javascript-sdk?lang=ko#request_pay-rsp
 */
@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '해당 컬럼은 결제의 성공 여부를 나타냅니다.' })
  success: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'imp_uid',
    comment: '해당 컬럼은 아임포트 고유 결제번호를 나타냅니다.',
  })
  impUid: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'merchant_uid',
    comment: '해당 컬럼은 가맹점에서 생성/관리하는 고유 주문번호를 나타냅니다.',
  })
  merchantUid: string;

  @Column({
    type: 'enum',
    name: 'pay-method',
    enum: PAY_METHOD_ENUM,
    comment: '해당 컬럼은 결제 수단을 나타냅니다.',
  })
  payMethod: PAY_METHOD_ENUM;

  @Column({
    type: 'int',
    name: 'pay_amount',
    comment: '해당 컬럼은 결재 금액 나타냅니다.',
  })
  paidAmount: number;

  @Column({
    type: 'enum',
    enum: PAY_STATUS_ENUM,
    comment: '해당 컬럼은 결제 상태를 나타냅니다.',
  })
  status: PAY_STATUS_ENUM;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '해당 컬럼은 주문명을 나타냅니다.',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: PG_PROVIDER_ENUM,
    name: 'pg_provider',
    comment: '해당 컬럼은 결재승인/시도된 PG사를 나타냅니다.',
  })
  pgProvider: PG_PROVIDER_ENUM;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'emb_pg_provider',
    comment:
      '해당 컬럼은 결제창에서 간편결제 호출시 결제 승인된 PG사를 나타냅니다.',
  })
  embPgProvider: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'pg_tid',
    comment: '해당 컬럼은 PG사 거래고유번호를 나타냅니다.',
  })
  pgTid: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'buyer_name',
    comment: '해당 컬럼은 주문자 이름을 나타냅니다.',
  })
  buyerName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'buyer_email',
    comment: '해당 컬럼은 주문자 Email을 나타냅니다.',
  })
  buyerEmail: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'buyer_tel',
    comment: '해당 컬럼은 주문자 연락처를 나타냅니다.',
  })
  buyerTel: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'buyer_addr',
    comment: '해당 컬럼은 주문자 주소를 나타냅니다.',
  })
  buyerAddr: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'buyer_postcode',
    comment: '해당 컬럼은 주문자 우편번호를 나타냅니다.',
  })
  buyerPostcode: string;

  @Column({
    type: 'text',
    name: 'custom_data',
    comment: '해당 컬럼은 가맹점 임의 지정 데이터를 나타냅니다.',
  })
  customData: string;

  @Column({
    type: 'int',
    name: 'paid_at',
    comment: '해당 컬럼은 결제승인시각(UNIX timestamp)를 나타냅니다.',
  })
  paidAt: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'receipt_url',
    comment: '해당 컬럼은 PG사에서 발행되는 거래 매출전표 URL을 나타냅니다.',
  })
  receiptUrl: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'anonymous_id',
    default: null,
    comment:
      '해당 컬럼은 비회원 주문 시 비회원을 식별하기 위한 id를 나타냅니다.',
  })
  anonymousId: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;
}
