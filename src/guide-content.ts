import type { Copy, CopyList, CopyPair } from './content'

/**
 * The free guide. It is the top of the funnel, which is exactly why it is held
 * to the same standard as the sales page: every count in here was read off
 * demo-assets/terminal/full-sweep.txt, and every SQL snippet is a query that
 * runs. Nothing is pitched until the last block.
 *
 * The pseudo-code below must never be styled as captured terminal output. It
 * describes a pattern the reader implements; the page's rule is that nothing
 * may be mistaken for a run that did not happen.
 */

/** Handed to LocaleProvider, which owns every head write on both pages. */
export const GUIDE_META = {
  title: {
    en: 'Your RLS tests are green. Here is how to find out if they are lying to you.',
    ar: 'اختبارات الـ RLS عندك خضراء. إليك كيف تعرف إن كانت تكذب عليك.',
  },
  description: {
    en: 'A field guide to auditing row-level security in a Supabase project: the six kinds of guard a schema actually has, the test-suite failure mode nobody talks about, and a 12-point checklist you can run before you hand a client portal over.',
    ar: 'دليل عملي لفحص row-level security في مشروع Supabase: الأنواع الستة للحماية الموجودة فعلًا في أي مخطَّط، وطريقة فشل الاختبارات التي لا يتحدث عنها أحد، وقائمة من 12 فحصًا تشغّلها قبل أن تسلّم بوابة عملاء.',
  },
  /** The share image is the product's own screenshot, described as exactly that. */
  ogAlt: {
    en: "The client portal in the Client Portal Starter Kit, the project this guide's examples come from.",
    ar: 'بوابة العميل في Client Portal Starter Kit، وهو المشروع الذي جاءت منه أمثلة هذا الدليل.',
  },
} satisfies Record<string, Copy>

export const GUIDE_NAV = {
  back: { en: 'Client Portal Starter Kit', ar: 'Client Portal Starter Kit' },
  backAria: {
    en: 'Client Portal Starter Kit — back to the product page',
    ar: 'Client Portal Starter Kit — العودة إلى صفحة المنتج',
  },
  skipToContent: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  tocHeading: { en: 'In this guide', ar: 'في هذا الدليل' },
} satisfies Record<string, Copy>

export const GUIDE_HEAD = {
  kicker: { en: 'Free guide · no email required to read it', ar: 'دليل مجاني · لا يتطلب بريدًا لقراءته' },
  h1: {
    en: 'Your RLS tests are green.',
    ar: 'اختبارات الـ RLS عندك خضراء.',
  },
  h1b: {
    en: 'Here is how to find out if they are lying to you.',
    ar: 'إليك كيف تعرف إن كانت تكذب عليك.',
  },
  standfirst: {
    en: [
      'A passing test proves that something refused. It does not prove that the thing you think is doing the refusing is the thing that refused. Those are different claims, and almost every security test suite quietly makes the first one while its author believes it made the second.',
      'This guide is how to tell them apart. It costs nothing, there is no gate on it, and everything in it works on any Supabase project — not only mine.',
    ],
    ar: [
      'الاختبار الناجح يثبت أن شيئًا ما رفض. لكنه لا يثبت أن الشيء الذي تظنه هو الرافض هو فعلًا من رفض. هذان ادّعاءان مختلفان، ومعظم مجموعات اختبارات الأمان تقدّم الأول بهدوء بينما يظن كاتبها أنها قدّمت الثاني.',
      'هذا الدليل هو كيف تفرّق بينهما. لا يكلّفك شيئًا، ولا يوجد عليه أي حاجز، وكل ما فيه يعمل على أي مشروع Supabase — لا على مشروعي أنا فقط.',
    ],
  },
  readingTime: { en: 'About 12 minutes', ar: 'حوالي 12 دقيقة' },
} satisfies Record<string, Copy | CopyList>

/* ------------------------------------------------------------------ §1 */

export const G1 = {
  n: '01',
  heading: {
    en: '"The test passed" and "the guard works" are not the same sentence',
    ar: '«الاختبار نجح» و«الحماية تعمل» ليستا الجملة نفسها',
  },
  body: {
    en: [
      'Here is the shape of almost every security test ever written: sign in as someone who should not be allowed to do a thing, try to do the thing, assert that it failed.',
      'That test passes whenever anything at all refuses. It does not care which layer refused. If your schema has four separate mechanisms that could each have blocked that write, the test goes green when any one of them fires — and stays green when three of them are deleted.',
      'So the suite is not measuring what you think. It is measuring "at least one guard is still standing", and reporting it as "this specific guard works". Those diverge silently, and they diverge in the direction that costs you money: you delete or refactor a guard, nothing turns red, and you conclude the guard was doing nothing.',
      'The only way to close the gap is to stop asking "does the test pass?" and start asking a harder question: **when I break this specific guard, does a named test turn red?** A guard that can be removed without consequence is not protected by your suite, whatever colour the suite is.',
    ],
    ar: [
      'هذا هو شكل كل اختبار أمان تقريبًا: سجّل الدخول بهوية شخص لا يُفترض أن يُسمح له بفعل شيء، ثم حاول فعل الشيء، ثم تأكّد أن المحاولة فشلت.',
      'هذا الاختبار ينجح كلما رفض أي شيء على الإطلاق. وهو لا يهتم بأي طبقة رفضت. فإن كان في مخطَّطك أربع آليات منفصلة كان بإمكان كلٍّ منها منع تلك الكتابة، فالاختبار يصير أخضر حين تعمل أي واحدة منها — ويظل أخضر بعد حذف ثلاث منها.',
      'إذن المجموعة لا تقيس ما تظنه. هي تقيس «ما تزال حماية واحدة على الأقل قائمة»، وتبلّغ عنها بوصفها «هذه الحماية تحديدًا تعمل». والفرق بينهما يتّسع في صمت، ويتّسع في الاتجاه الذي يكلّفك: تحذف حماية أو تعيد هيكلتها، فلا يحمرّ شيء، فتستنتج أنها كانت بلا فائدة.',
      'والطريقة الوحيدة لسدّ الفجوة هي أن تتوقف عن سؤال «هل نجح الاختبار؟» وتبدأ سؤالًا أصعب: **حين أكسر هذه الحماية تحديدًا، هل يحمرّ اختبار محدد بالاسم؟** فالحماية التي يمكن إزالتها بلا أثر ليست محميّة بمجموعتك، مهما كان لونها.',
    ],
  },
} satisfies { n: string; heading: Copy; body: CopyList }

/* ------------------------------------------------------------------ §2 */

export const G2 = {
  n: '02',
  heading: {
    en: 'The run where a green suite proved nothing',
    ar: 'التشغيل الذي لم تُثبِت فيه مجموعة خضراء أي شيء',
  },
  body: {
    en: [
      'This is not hypothetical. It happened in the schema this guide comes out of, and it is the reason the guide exists.',
      'The sharpest guard in that project is an is_admin() check inside a function called set_user_role. The function runs with owner privileges, and any signed-in user can call it. That one check is the entire distance between an ordinary client and a client who has made themselves an administrator.',
      'Deleting the check turned nothing red. Every test still passed.',
      'The reason: a second layer — a trigger comparing the old role to the new one — caught the write and raised an error with the same code and the same wording. The test asserting "the call was refused" could not tell the two apart, so it passed on a guard it was not testing, and had been doing so the whole time.',
      'The fix was not a better test. It was making the layers distinguishable: each one raises its own error, and each test asserts the specific one. Breaking that check now turns exactly two tests red.',
      'Zero to two. Nothing about the security changed — the schema was equally safe before and after. What changed is that the suite can now tell you when it stops being safe.',
    ],
    ar: [
      'هذا ليس افتراضًا. حدث فعلًا في المخطَّط الذي خرج منه هذا الدليل، وهو سبب وجود الدليل أصلًا.',
      'أحدّ حماية في ذلك المشروع هي فحص is_admin() داخل دالة اسمها set_user_role. الدالة تعمل بصلاحيات المالك، وأي مستخدم مسجَّل يستطيع استدعاءها. وذلك الفحص وحده هو كامل المسافة بين عميل عادي وبين عميل رقّى نفسه إلى مشرف.',
      'حذف الفحص لم يُحوِّل أي اختبار إلى الأحمر. كل الاختبارات ظلّت تنجح.',
      'والسبب: طبقة ثانية — trigger يقارن الدور القديم بالجديد — كانت تلتقط الكتابة وترفع خطأً بالرمز نفسه والصياغة نفسها. والاختبار الذي يؤكد «أن الاستدعاء رُفض» لم يكن يقدر على التمييز بينهما، فكان ينجح على حماية لا يختبرها، وظل يفعل ذلك طوال الوقت.',
      'ولم يكن الحل اختبارًا أفضل. كان الحل أن نجعل الطبقات قابلة للتمييز: كل طبقة ترفع خطأها الخاص، وكل اختبار يتحقق من الخطأ المحدد. وكسر ذلك الفحص الآن يُحوِّل اختبارين بالضبط إلى الأحمر.',
      'من صفر إلى اثنين. ولم يتغير شيء في الأمان — فالمخطَّط كان آمنًا بالقدر نفسه قبل وبعد. الذي تغيّر أن المجموعة صارت قادرة على إخبارك حين يتوقف عن كونه آمنًا.',
    ],
  },
  pull: {
    en: 'A test that passes for the wrong reason is worse than no test, because it is a test you trust.',
    ar: 'الاختبار الذي ينجح لسبب خاطئ أسوأ من عدم وجود اختبار، لأنه اختبار تثق به.',
  },
} satisfies { n: string; heading: Copy; body: CopyList; pull: Copy }

/* ------------------------------------------------------------------ §3 */

export const G3 = {
  n: '03',
  heading: {
    en: 'Six kinds of guard live in a Supabase schema. Most suites test one.',
    ar: 'ستة أنواع من الحماية تعيش في أي مخطَّط Supabase. ومعظم المجموعات تختبر نوعًا واحدًا.',
  },
  intro: {
    en: [
      'When people say "we use RLS", they almost always mean the policies. Policies are one of six mechanisms, and they are not even the one most likely to be misconfigured.',
      'The counts beside each kind below are from a real sweep of one four-table schema — 40 guards in total. They are here to show the proportions, not because your schema will have the same numbers.',
    ],
    ar: [
      'حين يقول الناس «إحنا مستخدمين RLS»، فهم يقصدون السياسات في الغالب. والسياسات نوع واحد من ستة، وليست حتى الأرجح في سوء الضبط.',
      'الأعداد بجانب كل نوع أدناه مأخوذة من sweep حقيقي لمخطَّط من أربعة جداول — 40 حماية إجمالًا. وهي هنا لتُظهر النِّسَب، لا لأن مخطَّطك سيحمل الأرقام نفسها.',
    ],
  },
  kinds: [
    {
      term: { en: 'rls: — is row-level security switched on at all?  (4)', ar: 'rls: — هل row-level security مفعَّل أصلًا؟  (4)' },
      desc: {
        en: 'Separate from, and prior to, any policy. A table with beautiful policies and RLS disabled enforces nothing: Postgres never consults them. New tables arrive with it off. This is the cheapest guard to check and the most catastrophic to miss.',
        ar: 'منفصل عن أي سياسة وسابق عليها. فالجدول الذي له سياسات ممتازة و row-level security مُطفأ عليه لا يفرض شيئًا: Postgres لا يستشيرها أصلًا. والجداول الجديدة تأتي وهو مُطفأ. وهذه أرخص حماية في الفحص وأكثرها كارثيةً عند إغفالها.',
      },
    },
    {
      term: { en: 'policy: — the individual policies  (14)', ar: 'policy: — السياسات المفردة  (14)' },
      desc: {
        en: 'One per table per command — select, insert, update, delete — plus the ones on storage.objects. The count is high because each command needs its own; a table with only a SELECT policy is not protected on writes, it is protected by the absence of a write policy, which is a different and more fragile thing.',
        ar: 'واحدة لكل جدول لكل أمر — select و insert و update و delete — بالإضافة إلى سياسات storage.objects. والعدد كبير لأن كل أمر يحتاج سياسته؛ فالجدول الذي له سياسة SELECT فقط ليس محميًا في الكتابة، بل محميّ بغياب سياسة كتابة، وهذا شيء مختلف وأهش.',
      },
    },
    {
      term: { en: 'grant: — table and column privileges  (8)', ar: 'grant: — صلاحيات الجداول والأعمدة  (8)' },
      desc: {
        en: 'Postgres checks privileges before it ever reaches a policy. Column-level grants are the part almost nobody uses and the part that does the most work: if the authenticated role simply has no UPDATE privilege on the column that decides authorisation, no policy is needed to protect it and no policy can be written badly enough to expose it.',
        ar: 'يفحص Postgres الصلاحيات قبل أن يصل إلى أي سياسة. وصلاحيات مستوى العمود هي الجزء الذي لا يستخدمه أحد تقريبًا، وهو الجزء الذي يؤدي أكبر عمل: فإن كان دور authenticated ببساطة لا يملك صلاحية UPDATE على العمود الذي يقرر الصلاحيات، فلا حاجة لأي سياسة لحمايته، ولا توجد سياسة يمكن أن تُكتب بسوء يكفي لكشفه.',
      },
    },
    {
      term: { en: 'definer: — checks inside SECURITY DEFINER functions  (5)', ar: 'definer: — الفحوصات داخل دوال SECURITY DEFINER  (5)' },
      desc: {
        en: 'These run with the owner\'s privileges, which means they bypass the caller\'s RLS entirely. Every one of them is a hole you deliberately cut, and the only thing standing in it is whatever check you wrote by hand at the top. Ask of each: who may EXECUTE this, and what does it verify about them?',
        ar: 'هذه تعمل بصلاحيات المالك، أي أنها تتجاوز RLS الخاص بالمستدعي تمامًا. وكل واحدة منها فتحة قطعتها أنت عن عمد، والشيء الوحيد الواقف فيها هو ما كتبته بيدك من فحص في أولها. اسأل عن كل واحدة: من يملك EXECUTE عليها، وماذا تتحقق منه بشأنه؟',
      },
    },
    {
      term: { en: 'trigger: — invariants a policy cannot express  (3)', ar: 'trigger: — ثوابت لا تستطيع السياسة التعبير عنها  (3)' },
      desc: {
        en: 'A policy sees a row. A trigger sees the old row and the new one together, which is the only place you can say "this column may not change" or "this write must be logged". They are also the layer most likely to shadow another one — see section 5.',
        ar: 'السياسة ترى صفًّا. أما الـ trigger فيرى الصف القديم والجديد معًا، وهو المكان الوحيد الذي تستطيع أن تقول فيه «هذا العمود لا يجوز أن يتغير» أو «هذه الكتابة يجب أن تُسجَّل». وهي أيضًا الطبقة الأرجح في حجب طبقة أخرى — انظر القسم 5.',
      },
    },
    {
      term: { en: 'storage: — the bucket itself  (2)', ar: 'storage: — الـ bucket نفسه  (2)' },
      desc: {
        en: 'Whether the bucket is private, and whether size and MIME limits are enforced by the bucket rather than by your upload form. A limit enforced in the browser is a suggestion; the request that ignores your form does not know your form exists.',
        ar: 'هل الـ bucket خاص، وهل حدود الحجم والنوع مفروضة من الـ bucket نفسه لا من نموذج الرفع عندك. فالحدّ المفروض في المتصفح اقتراح؛ والطلب الذي يتجاهل نموذجك لا يعرف أن نموذجك موجود أصلًا.',
      },
    },
  ],
  after: {
    en: [
      'The remaining four guards in that run are not a seventh kind — they are pairs, broken together on purpose. Section 5 explains why that is necessary.',
      'Here are three queries that answer "which of these do I actually have?" for any Postgres database. Run them against your own project before you read further; the answers are usually shorter than people expect.',
    ],
    ar: [
      'أما الحمايات الأربع الباقية في ذلك التشغيل فليست نوعًا سابعًا — بل أزواج تُكسر معًا عن قصد. والقسم 5 يشرح لماذا ذلك ضروري.',
      'وهذه ثلاثة استعلامات تجيب عن سؤال «أي من هذه أملكه فعلًا؟» في أي قاعدة بيانات Postgres. شغّلها على مشروعك أنت قبل أن تكمل القراءة؛ فالإجابات عادةً أقصر مما يتوقع الناس.',
    ],
  },
} satisfies { n: string; heading: Copy; intro: CopyList; kinds: readonly CopyPair[]; after: CopyList }

/** Real queries. Each one runs as written on any Postgres 12+ / Supabase project. */
export const Q_RLS_ON = `-- 1. Every ordinary table in public, and whether RLS is actually enabled.
--    Sort puts the unprotected ones at the top, where you want them.
select   relname as table_name,
         relrowsecurity as rls_enabled
from     pg_class
where    relnamespace = 'public'::regnamespace
and      relkind = 'r'
order by relrowsecurity, relname;`

export const Q_NO_POLICY = `-- 2. Tables where RLS is ON but no policy exists.
--    These deny everything, which is safe — and is usually not what was meant.
select   c.relname as table_name
from     pg_class c
left join pg_policy p on p.polrelid = c.oid
where    c.relnamespace = 'public'::regnamespace
and      c.relkind = 'r'
and      c.relrowsecurity
group by c.relname
having   count(p.oid) = 0;`

export const Q_COLUMN_GRANTS = `-- 3. What can a signed-in user write, column by column?
--    Look for the column that decides authorisation. If it appears here,
--    a policy is the only thing standing between a user and their own promotion.
select   table_name, column_name, privilege_type
from     information_schema.column_privileges
where    grantee = 'authenticated'
and      privilege_type in ('INSERT', 'UPDATE')
order by table_name, column_name;`

/* ------------------------------------------------------------------ §4 */

export const G4 = {
  n: '04',
  heading: { en: 'The guard sweep pattern', ar: 'نمط الـ guard sweep' },
  body: {
    en: [
      'Once you can list your guards, the audit is mechanical. For each one: confirm the suite is green, break that guard and nothing else, run the whole suite, write down which tests turned red by name, put the guard back, and confirm the suite went green again.',
      'The restore-and-reconfirm step is not ceremony. Without it, a sweep that leaves the database subtly broken makes every subsequent guard look untested, and you will spend an afternoon chasing a bug in your auditing tool rather than in your schema.',
      'The output that matters is not the count of guards that turned tests red. It is the list of guards that turned nothing red. That list is the exact set of protections your suite does not cover — the thing you could not have learned from a green run.',
    ],
    ar: [
      'ما إن تستطيع سرد حمايات مشروعك، يصير الفحص آليًا. لكل حماية: تأكّد أن المجموعة خضراء، ثم اكسر تلك الحماية وحدها دون غيرها، ثم شغّل المجموعة كاملة، ثم دوّن بالاسم أي الاختبارات احمرّت، ثم أعِد الحماية، ثم تأكّد أن المجموعة رجعت خضراء.',
      'وخطوة الإعادة وإعادة التأكيد ليست طقسًا. فبدونها، أي sweep يترك قاعدة البيانات مكسورة بشكل خفي سيجعل كل حماية تالية تبدو غير مُختبَرة، وستقضي بعد ظهر يوم كامل تطارد عطلًا في أداة الفحص لا في مخطَّطك.',
      'والمخرَج المهم ليس عدد الحمايات التي أحمرّت لها اختبارات. بل قائمة الحمايات التي لم تُحمِّر شيئًا. تلك القائمة هي بالضبط مجموعة الحمايات التي لا تغطّيها مجموعتك — وهي الشيء الذي ما كان لتشغيل أخضر أن يخبرك به.',
    ],
  },
  patternLabel: {
    en: 'The pattern — pseudo-code, not a captured run',
    ar: 'النمط — كود توضيحي، وليس تشغيلًا مُلتقَطًا',
  },
  notes: {
    en: [
      'Two practical points. First, "break the guard" should be one statement you can invert — DROP POLICY, REVOKE, ALTER TABLE ... DISABLE ROW LEVEL SECURITY, a CREATE OR REPLACE of the function without its check. If breaking a guard takes a paragraph of SQL, the guard is doing more than one job and should be split.',
      'Second, some breaks change data as a side effect, and the cheapest honest restore is a full database reset rather than an inverse statement. That is slower and entirely worth it: a sweep whose restore is approximate produces results that are also approximate.',
    ],
    ar: [
      'نقطتان عمليتان. الأولى: «كسر الحماية» يجب أن يكون جملة واحدة تستطيع عكسها — DROP POLICY أو REVOKE أو ALTER TABLE ... DISABLE ROW LEVEL SECURITY أو CREATE OR REPLACE للدالة بدون فحصها. فإن استغرق كسر حماية فقرةً من SQL، فتلك الحماية تؤدي أكثر من وظيفة ويجب فصلها.',
      'الثانية: بعض عمليات الكسر تغيّر البيانات كأثر جانبي، وأرخص استعادة صادقة هي إعادة تهيئة كاملة لقاعدة البيانات بدل جملة عكسية. وذلك أبطأ ويستحق تمامًا: فالـ sweep الذي تكون استعادته تقريبية ينتج نتائج تقريبية أيضًا.',
    ],
  },
} satisfies { n: string; heading: Copy; body: CopyList; patternLabel: Copy; notes: CopyList }

export const SWEEP_PATTERN = `for guard in guards:
    require(suite_is_green())        # start from a known-good baseline

    apply(guard.break)               # exactly one guard, on purpose
    red = run_suite().failing_names  # capture NAMES, never just a count
    restore(guard)                   # inverse statement, or a full db reset

    require(suite_is_green())        # prove the restore actually worked
    record[guard] = red

# The report is not the guards that turned tests red.
# It is this line — the guards your suite does not cover:
report([g for g in guards if record[g] == []])`

/* ------------------------------------------------------------------ §5 */

export const G5 = {
  n: '05',
  heading: {
    en: 'Some guards cannot be proven alone, and that is not a bug',
    ar: 'بعض الحمايات يتعذّر إثباتها منفردة، وهذا ليس عطلًا',
  },
  body: {
    en: [
      'Run a sweep on a well-layered schema and you will find guards that turn nothing red no matter what you do to them. Before you delete them, check whether they are unreachable rather than useless — because from the outside those two look identical, and only one of them is safe to remove.',
      'Three examples from the schema this guide comes from, all three of which are shadowed:',
      'An UPDATE policy on a table can be unreachable while its SELECT policy holds, because UPDATE ... WHERE has to find the row before it can change it. A storage UPDATE policy can be unreachable while INSERT holds, because an upsert is checked against INSERT too and INSERT refuses first. And a trigger that compares old and new values is never consulted if the column it watches was never granted to the caller — the write dies at the privilege check, several steps earlier.',
      'That is defence in depth seen from the inside. The outer layer refuses first, every time, so the inner layer never gets a turn — and a test cannot observe a layer that never runs.',
      'The way to test them is to break each one together with the layer that shadows it. Now the outer refusal is gone, the inner guard gets its turn, and you can see whether it does its job. What stays unproven is each one *alone*, and the honest thing to do with that is to publish the list rather than round it away.',
    ],
    ar: [
      'شغّل sweep على مخطَّط جيد الطبقات وستجد حمايات لا تُحمِّر شيئًا مهما فعلت بها. وقبل أن تحذفها، تحقّق مما إذا كانت غير قابلة للوصول لا عديمة الفائدة — فمن الخارج يبدو الأمران متطابقين، وواحد منهما فقط آمن الإزالة.',
      'ثلاثة أمثلة من المخطَّط الذي خرج منه هذا الدليل، وكلها محجوبة:',
      'سياسة UPDATE على جدول قد يتعذّر الوصول إليها ما دامت سياسة SELECT قائمة، لأن UPDATE ... WHERE يجب أن يعثر على الصف قبل أن يعدّله. وسياسة UPDATE في storage قد يتعذّر الوصول إليها ما دامت INSERT قائمة، لأن عملية upsert تُفحص أمام INSERT أيضًا، وINSERT ترفض أولًا. والـ trigger الذي يقارن القيم القديمة بالجديدة لا يُستدعى أبدًا إن كان العمود الذي يراقبه غير ممنوح للمستدعي أصلًا — إذ تموت الكتابة عند فحص الصلاحيات، قبل ذلك بخطوات.',
      'هذا هو الدفاع المتعدد الطبقات مرئيًّا من الداخل. الطبقة الخارجية ترفض أولًا في كل مرة، فلا يأتي دور الطبقة الداخلية قط — والاختبار لا يستطيع ملاحظة طبقة لا تعمل أبدًا.',
      'وطريقة اختبارها هي كسر كل واحدة منها مع الطبقة التي تحجبها. عندها يختفي الرفض الخارجي، ويأتي دور الحماية الداخلية، فترى إن كانت تؤدي عملها. ويبقى غير مُثبَت هو كل واحدة منها **منفردة**، والتصرف الصادق حيال ذلك هو نشر القائمة لا تقريبها إلى لا شيء.',
    ],
  },
} satisfies { n: string; heading: Copy; body: CopyList }

/* ------------------------------------------------------------------ §6 */

export const G6 = {
  n: '06',
  heading: {
    en: 'The most likely way you will introduce a leak: adding a table',
    ar: 'أرجح طريقة ستُدخِل بها تسريبًا: إضافة جدول',
  },
  body: {
    en: [
      'You audit the schema, you fix everything, you ship. Two months later the project needs a notes table, and you add one. It arrives with row-level security disabled, because in Postgres every table does. Nothing warns you. No migration fails. No test turns red, because you have not written a test for a table that did not exist when you wrote your tests.',
      'And the application works — which is the part that makes this dangerous. Your query filters by the signed-in user, the right rows come back, the feature ships. The filter is in your code, so it holds until the day it does not: a second endpoint that reads the table directly, an admin view someone reuses, a query where the where clause was dropped during a refactor.',
      'There is no clever defence here, only a boring one. Add the two lines to the same migration that creates the table, every time, and put a check in whatever you use to review migrations:',
      'Then re-run query 1 from section 3 as part of your release routine. It takes a second, it fits in a CI step, and it is the difference between finding this in a migration review and finding it in a support ticket.',
    ],
    ar: [
      'تفحص المخطَّط، وتصلح كل شيء، وتشحن. وبعد شهرين يحتاج المشروع جدول ملاحظات، فتضيفه. فيأتي وrow-level security مُطفأ عليه، لأن كل جدول في Postgres كذلك. ولا شيء ينبّهك. ولا تفشل أي migration. ولا يحمرّ أي اختبار، لأنك لم تكتب اختبارًا لجدول لم يكن موجودًا حين كتبت اختباراتك.',
      'والتطبيق يعمل — وهذا هو الجزء الذي يجعل الأمر خطرًا. فاستعلامك يُرشِّح حسب المستخدم المسجَّل، وتعود الصفوف الصحيحة، وتُشحن الميزة. الترشيح في كودك أنت، فيصمد حتى اليوم الذي لا يصمد فيه: مسار ثانٍ يقرأ الجدول مباشرة، أو شاشة مشرف يعيد أحدهم استخدامها، أو استعلام سقط منه شرط where أثناء إعادة هيكلة.',
      'ولا يوجد دفاع ذكي هنا، بل دفاع ممل فقط. أضف السطرين إلى الـ migration نفسه الذي ينشئ الجدول، في كل مرة، وضع فحصًا في أي أداة تراجع بها الـ migrations:',
      'ثم أعِد تشغيل الاستعلام الأول من القسم 3 ضمن روتين الإصدار عندك. يستغرق ثانية، ويتّسع لخطوة في الـ CI، وهو الفرق بين اكتشاف هذا في مراجعة migration واكتشافه في تذكرة دعم.',
    ],
  },
} satisfies { n: string; heading: Copy; body: CopyList }

export const NEW_TABLE_SQL = `create table public.notes (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references public.profiles (id),
  body       text not null
);

-- These two lines are the whole point. Without the first, the policy
-- below is decoration: Postgres never consults it.
alter table public.notes enable row level security;

create policy notes_select_own on public.notes
  for select to authenticated
  using (client_id = auth.uid());`

/* ------------------------------------------------------------------ §7 */

export const G7 = {
  n: '07',
  heading: {
    en: 'The twelve checks, before you hand it over',
    ar: 'الفحوصات الاثنا عشر، قبل أن تسلّم',
  },
  intro: {
    en: 'None of these need a tool. They need an afternoon, once, and then a few minutes per release. Work down the list against a real database, not against your memory of the schema.',
    ar: 'لا يحتاج أي منها إلى أداة. تحتاج بعد ظهر يوم واحد، مرة، ثم بضع دقائق مع كل إصدار. اعمل على القائمة مقابل قاعدة بيانات حقيقية، لا مقابل ذاكرتك عن المخطَّط.',
  },
  checks: {
    en: [
      'Every table in public has row-level security enabled — checked with query 1, not from memory.',
      'No table has RLS enabled with zero policies unless denying everything is what you meant — query 2.',
      'Every command you allow (select, insert, update, delete) has its own policy. Absence of a policy is not a policy.',
      'The column that decides authorisation is not writable by the authenticated role — query 3.',
      'That column defaults to the least privilege, and the default is in the schema rather than in your sign-up code.',
      'Every SECURITY DEFINER function: you know who can EXECUTE it, and it verifies the caller in its first statement.',
      'Each layer raises a distinguishable error, and each test asserts the specific one — the section 2 failure.',
      'The storage bucket is private, and size and MIME limits are set on the bucket, not only in the upload form.',
      'The storage update path is covered too, because an upsert is a write your INSERT policy may be silently catching.',
      'Deactivating a user removes their powers rather than hiding the button — test it by signing in as one.',
      'The audit trail survives the deletion of its subject: the actor column is ON DELETE SET NULL, never CASCADE.',
      'Breaking each guard turns a named test red. Anything that breaks quietly is untested — write it down and publish the list.',
    ],
    ar: [
      'كل جدول في public لديه row-level security مفعَّل — مفحوصًا بالاستعلام الأول، لا من الذاكرة.',
      'لا يوجد جدول عليه RLS بلا سياسات إطلاقًا، إلا إن كان رفض كل شيء هو ما تقصده — الاستعلام الثاني.',
      'كل أمر تسمح به (select و insert و update و delete) له سياسته الخاصة. فغياب السياسة ليس سياسة.',
      'العمود الذي يقرر الصلاحيات غير قابل للكتابة من دور authenticated — الاستعلام الثالث.',
      'ذلك العمود قيمته الافتراضية هي الأقل صلاحية، والافتراضي في المخطَّط لا في كود التسجيل عندك.',
      'كل دالة SECURITY DEFINER: تعرف من يملك EXECUTE عليها، وهي تتحقق من المستدعي في أول جملة فيها.',
      'كل طبقة ترفع خطأً قابلًا للتمييز، وكل اختبار يتحقق من الخطأ المحدد — وهو فشل القسم الثاني.',
      'الـ storage bucket خاص، وحدود الحجم والنوع مضبوطة على الـ bucket نفسه، لا في نموذج الرفع فقط.',
      'مسار التحديث في storage مغطّى أيضًا، لأن upsert كتابةٌ قد تلتقطها سياسة INSERT عندك في صمت.',
      'تعطيل مستخدم يسحب صلاحياته لا يخفي الزر فقط — اختبرها بتسجيل الدخول بهويّة واحد منهم.',
      'سجل التدقيق يبقى بعد حذف صاحبه: عمود الفاعل مضبوط على ON DELETE SET NULL، لا CASCADE أبدًا.',
      'كسر كل حماية يُحوِّل اختبارًا محددًا بالاسم إلى الأحمر. وأي شيء يُكسَر بهدوء فهو غير مُختبَر — دوّنه وانشر القائمة.',
    ],
  },
} satisfies { n: string; heading: Copy; intro: Copy; checks: CopyList }

/* ------------------------------------------------------- close + capture */

export const GUIDE_CLOSE = {
  heading: { en: 'That is the whole method', ar: 'هذه هي الطريقة كاملة' },
  body: {
    en: [
      'There is nothing withheld above. The taxonomy, the queries, the sweep pattern and the checklist are the complete thing — run them against your own project and you will get the same class of answer I got, including the uncomfortable parts.',
      'I wrote all of it while building a client portal template, which is the only reason I know the failure in section 2 is real: I shipped it, and the sweep is what caught it.',
    ],
    ar: [
      'لا شيء محجوب فيما سبق. فالتصنيف والاستعلامات ونمط الـ sweep وقائمة الفحص هي الشيء كاملًا — شغّلها على مشروعك أنت وستحصل على النوع نفسه من الإجابة الذي حصلت عليه، بما في ذلك الأجزاء المزعجة.',
      'كتبت هذا كله وأنا أبني قالب بوابة عملاء، وهو السبب الوحيد الذي يجعلني أعرف أن الفشل في القسم الثاني حقيقي: شحنته، والـ sweep هو ما التقطه.',
    ],
  },
  runsHeading: { en: 'The runs behind every number here', ar: 'التشغيلات وراء كل رقم هنا' },
  runsNote: {
    en: 'Plain text, no sign-up. The counts in section 3 are in the first of these — you can count them yourself.',
    ar: 'نص عادي، بلا تسجيل. وأعداد القسم الثالث موجودة في أولها — تستطيع عدّها بنفسك.',
  },
  productHeading: { en: 'And the template it came out of', ar: 'والقالب الذي خرج منه' },
  productBody: {
    en: 'A client portal in React, TypeScript and Supabase, where the sweep above is a command you run rather than a thing I claim: 40 guards broken on purpose, 37 proven, 3 named. It is one payment and it runs on your own Supabase project. If you only came for the guide, that is a complete outcome and you owe me nothing.',
    ar: 'بوابة عملاء بـ React و TypeScript و Supabase، حيث الـ sweep أعلاه أمرٌ تشغّله لا ادّعاءً أقوله: 40 حماية تُكسر عمدًا، 37 مُثبَتة، و3 مذكورة بالاسم. دفعة واحدة، ويعمل على مشروع Supabase الخاص بك. وإن كنت جئت من أجل الدليل فقط، فتلك نتيجة كاملة ولا تدين لي بشيء.',
  },
  productCta: { en: 'See the template', ar: 'اطّلع على القالب' },
} satisfies Record<string, Copy | CopyList>

export const GUIDE_SIGNUP = {
  heading: { en: 'Tell me when the sweep results change', ar: 'أخبرني حين تتغيّر نتائج الـ sweep' },
  body: {
    en: 'One line when a new run publishes different numbers, or when this guide gains a section. No sequence, no newsletter, one click to stop. The address is stored on its own — no name, no IP, nothing else.',
    ar: 'سطر واحد حين ينشر تشغيل جديد أرقامًا مختلفة، أو حين يكسب هذا الدليل قسمًا جديدًا. لا سلسلة رسائل ولا نشرة بريدية، وإيقافه بنقرة. ويُحفَظ البريد وحده — بلا اسم ولا عنوان IP ولا أي شيء آخر.',
  },
} satisfies Record<string, Copy>
