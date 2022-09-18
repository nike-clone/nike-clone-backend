import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1663496966270 implements MigrationInterface {
    name = 'migration1663496966270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`success\` tinyint NOT NULL COMMENT '해당 컬럼은 결제의 성공 여부를 나타냅니다.', \`imp_uid\` varchar(255) NOT NULL COMMENT '해당 컬럼은 아임포트 고유 결제번호를 나타냅니다.', \`merchant_uid\` varchar(255) NOT NULL COMMENT '해당 컬럼은 가맹점에서 생성/관리하는 고유 주문번호를 나타냅니다.', \`pay-method\` enum ('card', 'trans', 'vbank', 'phone', 'kakaopay', 'payco', 'lpay', 'ssgpay', 'tosspay', 'point') NOT NULL COMMENT '해당 컬럼은 결제 수단을 나타냅니다.', \`pay_amount\` int NOT NULL COMMENT '해당 컬럼은 결재 금액 나타냅니다.', \`status\` enum ('ready', 'paid', 'failed') NOT NULL COMMENT '해당 컬럼은 결제 상태를 나타냅니다.', \`name\` varchar(255) NOT NULL COMMENT '해당 컬럼은 주문명을 나타냅니다.', \`pg_provider\` enum ('html5_inicis', 'inicis', 'kakaopay', 'uplus', 'nice', 'jtnet', 'danal') NOT NULL COMMENT '해당 컬럼은 결재승인/시도된 PG사를 나타냅니다.', \`emb_pg_provider\` varchar(100) NOT NULL COMMENT '해당 컬럼은 결제창에서 간편결제 호출시 결제 승인된 PG사를 나타냅니다.', \`pg_tid\` varchar(255) NOT NULL COMMENT '해당 컬럼은 PG사 거래고유번호를 나타냅니다.', \`buyer_name\` varchar(100) NOT NULL COMMENT '해당 컬럼은 주문자 이름을 나타냅니다.', \`buyer_email\` varchar(50) NOT NULL COMMENT '해당 컬럼은 주문자 Email을 나타냅니다.', \`buyer_tel\` varchar(20) NOT NULL COMMENT '해당 컬럼은 주문자 연락처를 나타냅니다.', \`buyer_addr\` varchar(255) NOT NULL COMMENT '해당 컬럼은 주문자 주소를 나타냅니다.', \`buyer_postcode\` varchar(20) NOT NULL COMMENT '해당 컬럼은 주문자 우편번호를 나타냅니다.', \`custom_data\` text NOT NULL COMMENT '해당 컬럼은 가맹점 임의 지정 데이터를 나타냅니다.', \`paid_at\` int NOT NULL COMMENT '해당 컬럼은 결제승인시각(UNIX timestamp)를 나타냅니다.', \`receipt_url\` varchar(255) NOT NULL COMMENT '해당 컬럼은 PG사에서 발행되는 거래 매출전표 URL을 나타냅니다.', \`anonymous_id\` varchar(100) NULL COMMENT '해당 컬럼은 비회원 주문 시 비회원을 식별하기 위한 id를 나타냅니다.', \`created_at\` datetime(6) NOT NULL COMMENT '해당 컬럼은 주문 데이터가 DB에 저장된 시간을 나타냅니다.' DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
