# ⚽ 축구 내기

## 시작하기

```bash
npm i
npm start
```

브라우저에서 http://localhost:3000 열기

---

## Supabase 연결

`public/index.html` 상단 두 줄 수정:

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJh...';
```

### Supabase 테이블 생성 (SQL Editor에서 실행)

```sql
-- 내기 데이터
create table soccer_bet (
  id text primary key,
  data jsonb,
  updated_at timestamptz default now()
);

-- 채팅
create table bet_chat (
  id bigserial primary key,
  bet_id text,
  nick text,
  text text,
  created_at timestamptz default now()
);

-- RLS 비활성화 (간단 사용)
alter table soccer_bet disable row level security;
alter table bet_chat disable row level security;
```

---

## 기능

- 팀 선택 (FIFA 등록 국가 드롭다운)
- 참가자 예측 입력 (스코어, 첫골 시간)
- 경기 시작 후 자동 잠금
- 관리자 비밀번호로 결과 확정
- 확정 시 모두의 순위보기 버튼 활성화
- 점수제 순위 (만점 100점)
- 실시간 채팅
- BGM (페이지 첫 클릭 시 자동 재생)

## 비밀번호
`kanto00999897`
