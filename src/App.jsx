import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  LayoutDashboard, Users, Apple, ClipboardList, UtensilsCrossed,
  Search, Plus, Trash2, ChevronUp, ChevronDown, Star, FileDown,
  Copy, Pencil, X, Check, ArrowLeft, Save, Printer, ChevronRight,
  Salad, Flame, Beef, Wheat, Droplets, Leaf, Calendar, User,
  ClipboardCopy, StickyNote, Filter, MoreVertical, LogOut, Lock, Eye, EyeOff
} from "lucide-react";

/* ============================================================
   LOGO (embutida em base64 — marca @hlnutri)
   ============================================================ */
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABGhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMi0wMS0wODwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4yZjY1MTI3Yy1kZjAyLTRmZmEtYTczZS02NjVkOGIxZTE2MGQ8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+Rml0IHdlYXI8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0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n9a6zllnnaWbbrqpxst8//33euKJJ4Ke0Yt4W1AgPARdxBwHa9++vbKzs4/49QEDBqhz585as2ZNjeu0aNGixnUkad68ecaDfs455ygjI6PGy8yZM0erVq2ydY5ly5YFdLmysjJ98803ts4CuFHUB52YI1jp6el67733dNZZZ+n33383PU7YBgwYUOsTzYYNG2Z70L/55ht98MEHuuCCC2q83NNPP628vDxbZwHcKKp/hk7MEaqWLVvqnXfe4QlVFhsyZIg++OCDI3598uTJuueeeyI4EeAeUXsPnZgjXFlZWZo0aZKuv/5606N4xt69e3XhhReqS5cu6tevX9Uby6xbt04zZ87UypUrTY8IOFZUBp2YwyrXXXedVq1apfHjx5sexVP+85//6D//+Y/pMQBXibqgE3NY7Z///KfWrl2rDz/8MOy10tPT9fjjj9d4mU2bNumRRx457Nc7deqk6667rsZz58+frzfffDOsGaszcOBA9enT54hfLy4urvp916xZMw0ePFg9evTQiSeeKJ/Pp//3//5fQOtI0muvvUbsgWpEVdCJOewQGxur6dOnq3Pnzvr+++/DWislJUXDhw+v8TIrVqyoNugtW7as9dyysjK9+eab6tSpU9VruQP5LO9zzz33oJeV7dy5UzNmzKj678zMzBr3Liws1F133aWxY8fqlltuUUJCQtXXDvzkxdrWkaSlS5cSdKAaURN0Yg47paamVj3zfdeuXabHqdWFF16o0aNHB3z5a665Rtdcc03Vf3/99dcHBb02cXFx+vDDD9WjR4+g5gQQOCPPcg/k3aCs9NhjjxFz2K5FixaaMWPGQfc+8YfExERiDlcqKSkJ6TwTr4AxEvTk5OSI7TV69Gj99a9/jdh+iG5du3a1/NPAAJizdevWkM6LZOcqGXnIPSUlJSL7jB49WmPGjInIXkCl7OxsrV69Whs2bDA9CoAwbdmyJehz6tWrZ8MktTNyD71Bgwa270HMYdKjjz6qiy66yPQYAMKwceNG7du3L+jzGjZsaMM0tTNyD71Vq1b6/PPPbVufmMO02NhYXXnllabHcKxdu3bp559/VlxcHO+2B8cK5omfB2rVqpXFkwTGyD301q1b27Y2MQdqN27cODVt2lRNmzbV888/X+vlb7/99qrLN23aVP369Qtp3/Xr16tHjx5q2LChMjMzdcYZZ6h9+/YhrQXY7Z133gnpvLZt21o8SWCM3EO367OMiTkiZcOGDWrWrJnpMUK2d+9e7d27V5JUUFBQ6+Xz8vK0efPmsPYsKSlRz549tW7durDWASJh2bJlWrRoUUjnnnnmmRZPExgj99C7dOli+WcfE3NE0vvvv68nn3zS9BgHiYmJMT1CjWbNmkXM4Ro333xzyOf26tXLwkkCZ+x16F27drVsPWIOE+6++269//77Ed+3Tp061f66qWfWBmrJkiWmRwAC8uabb+qrr74K6dz27dsrPT3d4okCY+zjUy+55BJL1iHmMKWiokJDhgzRt99+a9maZWVltV6madOmio09/LduIG/hatKBb/EKONWqVas0bNiwkM+/9NJLLZwmOMaCPnjw4LDXGDlyJDGHUfn5+erfv7927txpyXqBRC85Ofmwh/QaNGigQYMGhbRnRUVFrZeJi4sLae0D+f3+sNcA7LRz50716dNHRUVFIa8xZMgQCycKjrGgH3XUUbrwwgvDWuPtt9/W6tWrLZoICM2GDRt08cUXh/wWkQcqKioK6A+T119/XdnZ2WrVqpV69eqlefPm6eijjw5pz0D+EtGxY8eQ1gbcYsOGDerSpYs2bdoU8hpdu3bVCSecYOFUwTEWdEm69957wzp/8+bN6tKlixYsWGDRREBovvjiC11//fWWrLV8+fJaL3P00Udr6tSpWrt2rT7++GO1a9cu5P0C+TCZG264QU8++aSGDx+uF198UUOHDg15P8BpFi9erDPPPDPsJ22G27RwGQ362WefrW7duoW1Rl5enrp3766+fftq6dKlFk0GBO+1116r9bPMA7Fw4UILpgnc4sWLa72Mz+fT7bffrueee05//vOflZ2dHYHJAHstW7ZM/fv3V2ZmZtg/Njv55JNDfn8GqxgNuvTHG1xY8XKb2bNn64wzzlDHjh01btw4bd++3YLpgOCMGjVKOTk5Ya0xZcqUiP68eeXKlUE/zNitWzcde+yxNk0E2Gfnzp2aMGFCVS+seqVKIG/QZDfjn4eekZGh2267TePGjbNkvWXLlmnZsmW64447VK9ePTVo0ECNGzeO+Ee2IjLCefKKHfx+v66++motWrQo5HdAW7Nmjd566y1dccUVFk9XPb/fr0cffVTPPvtswOfExsbq8ssv19NPP23jZJHxyy+/KCsry/QYsFF5ebl27NihnTt32vJqixtvvNHSl2KHyhGVe/jhh/X+++/rhx9+sHTdynfD+umnnyxdF6hJYWGh+vfvryVLlqhx48YhrTF8+HBlZGToxBNPtHi66k2ePFn9+vVT//79Az5n8ODBngh6YWGhrZ8tAW9r0aKF/vGPf5geQ5IDHnKXpKSkJM2YMUMJCQmmRwEssXnzZg0YMEDFxcUhnb97926dc845+vLLLwO6fEVFhe644w7t2LEjpP3Ky8s1ePBgTZ06NeBzMjMzXf32t0C44uPjlZOTo9TUVNOjSHJI0CXplFNO0aRJk0yPAVgmNzc3rDeo2LZtm7p166Zhw4Zp5cqV1V6mpKREOTk5Vc8dCce+ffs0bNgwnXvuucrJyanxxxn5+fl64403AnoNO+BVTz31lKPe0CnG77B3exgzZowefPBB02MAjnPssceqXbt2ql+/vioqKrRt2zYtWbIkpM9rDoTP51O7du3UtGlTpaWlSfrjx1g///yz1qxZo/3799uyL+AG999/vx566CHTYxzEcUGXpFtvvVXPPPOM6TEAADjMiBEjNHHiRNNjHMYxD7kfaOLEiRoxYoTpMQAAOIhTYy45NOjSH1EfPXq06TEAAJD0x4eBOTXmkkMfcj/Q4sWLNXjwYK1fv970KACAKNSyZUtNnz5dGRkZpkepkWPvoVc666yztGrVKt1zzz28OQwAIGLi4+P1t7/9Td99953jYy654B76gb799lvddtttmjdvnulRAAAedsEFF+iJJ55Q27ZtTY8SMMffQz9Qu3bt9Mknn2jBggXq2bOn6XEAAB7Tr18/LVmyRO+//76rYi657B76oX755RdNmTKFz0UHAITstNNO0xVXXKGhQ4fquOOOMz1OyFwd9ANt3ry56v3gd+zYoV27dmnHjh369ddftXXrVtPjAQAMOvbYY9WoUSM1bNiw6p8nn3yyLrzwQjVs2ND0eJbwTNABAIhmrvoZOgAAqB5BBwDAAwg6AAAeQNABAPAAgg4AgAcQdAAAPICgAwDgAQQdAAAPIOgAAHgAQQcAwAMIOgAAHkDQAQDwAIIOAIAHEHQAADyAoAMA4AEEHQAADyDoAAB4AEEHAMADCDoAAB5A0AEA8ACCDgCABxB0AAA8gKADAOABBB0AAA8g6AAAeABBBwDAAwg6AAAeQNABAPCA/w/uMTJihMn5WwAAAABJRU5ErkJggg==";

/* ============================================================
   ACESSO — usuário e senha de demonstração
   Troque os valores abaixo para alterar as credenciais de acesso.
   ============================================================ */
const APP_CREDENTIALS = {
  username: "hlnutri",
  password: "nutri2026",
};

/* ============================================================
   DESIGN TOKENS
   Sage green + warm amber, serif display (Fraunces) / Inter body
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

    .npx * { box-sizing: border-box; }
    .npx {
      --bg: #FAF9F6;
      --surface: #FFFFFF;
      --surface-alt: #F3F1EB;
      --border: #E5E1D6;
      --border-strong: #CFC8B8;
      --text: #1A1815;
      --text-muted: #6B6459;
      --text-soft: #9C9484;
      --primary: #171512;
      --primary-dark: #000000;
      --primary-light: #ECE7DA;
      --accent: #B08D57;
      --accent-dark: #8C6F3F;
      --accent-light: #F4EAD3;
      --protein: #171512;
      --carbs: #B08D57;
      --fat: #6B5637;
      --fiber: #8A8168;
      --danger: #8B3A3A;
      --danger-light: #F5E5E1;
      --radius: 10px;
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.45;
    }
    .npx h1, .npx h2, .npx h3, .npx .npx-display {
      font-family: 'Fraunces', serif;
      letter-spacing: -0.01em;
    }
    .npx .npx-mono { font-family: 'JetBrains Mono', monospace; }
    .npx button { font-family: inherit; cursor: pointer; }
    .npx input, .npx select, .npx textarea { font-family: inherit; }
    .npx ::placeholder { color: var(--text-soft); }
    .npx-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .npx-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }

    @page { size: A4; margin: 0; }
    @media print {
      html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
      .no-print { display: none !important; }
      .print-only { display: block !important; }
      body, .npx { background: white !important; }
      #print-root {
        width: 210mm !important;
        min-height: 297mm !important;
        margin: 0 !important;
        box-shadow: none !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `}</style>
);

/* ============================================================
   SEED DATA
   ============================================================ */
const CATEGORIES = [
  "Cereais e Tubérculos", "Frutas", "Verduras e Legumes", "Leguminosas",
  "Carnes, Aves, Peixes e Ovos", "Laticínios", "Oleaginosas e Gorduras",
  "Bebidas", "Doces e Outros"
];

const CAT_ICON = {
  "Cereais e Tubérculos": Wheat, "Frutas": Apple, "Verduras e Legumes": Salad,
  "Leguminosas": Leaf, "Carnes, Aves, Peixes e Ovos": Beef, "Laticínios": Droplets,
  "Oleaginosas e Gorduras": Droplets, "Bebidas": Droplets, "Doces e Outros": Flame
};

let _foodSeq = 1000;

// Amplia as medidas já cadastradas sem inventar novos pesos:
// cada 1/2 e 1/4 é derivado matematicamente da medida original.
const expandMeasures = (measures = []) => {
  const expanded = [];
  const seen = new Set();
  const add = (label, grams) => {
    if (!label || !Number.isFinite(grams) || grams <= 0 || seen.has(label)) return;
    seen.add(label);
    expanded.push({ label, grams });
  };

  measures.forEach(m => {
    add(m.label, m.grams);
    if (!m.label.startsWith("g")) {
      add(`1/2 ${m.label.replace(/^1\s+/, "")}`, m.grams / 2);
      add(`1/4 ${m.label.replace(/^1\s+/, "")}`, m.grams / 4);
    }
  });
  add("g (gramas)", 1);
  return expanded;
};

const F = (name, category, kcal, protein, carbs, fat, fiber, measures) => ({
  id: "f" + (_foodSeq++),
  name, category,
  per100: { kcal, protein, carbs, fat, fiber },
  measures: expandMeasures(measures),
  favorite: false, usageCount: 0, custom: false
});

const SEED_FOODS = [
  F("Pão francês", "Cereais e Tubérculos", 300, 8, 58, 3, 2.3, [{ label: "1 unidade", grams: 50 }]),
  F("Pão de forma integral", "Cereais e Tubérculos", 253, 9.4, 43.3, 3.9, 6.9, [{ label: "1 fatia", grams: 25 }]),
  F("Arroz branco cozido", "Cereais e Tubérculos", 128, 2.5, 28.1, 0.2, 1.6, [{ label: "1 colher de sopa", grams: 25 }, { label: "1 xícara", grams: 158 }]),
  F("Arroz integral cozido", "Cereais e Tubérculos", 124, 2.6, 25.8, 1, 2.7, [{ label: "1 colher de sopa", grams: 25 }, { label: "1 xícara", grams: 158 }]),
  F("Macarrão cozido", "Cereais e Tubérculos", 158, 5.8, 30.9, 1.1, 1.8, [{ label: "1 xícara", grams: 140 }]),
  F("Aveia em flocos", "Cereais e Tubérculos", 394, 13.9, 67, 8.5, 9.1, [{ label: "1 colher de sopa", grams: 15 }]),
  F("Tapioca (goma hidratada)", "Cereais e Tubérculos", 240, 0.2, 59.3, 0, 0.5, [{ label: "1 unidade média", grams: 60 }]),
  F("Batata inglesa cozida", "Cereais e Tubérculos", 52, 1.2, 11.9, 0, 1.3, [{ label: "1 unidade média", grams: 100 }]),
  F("Batata doce cozida", "Cereais e Tubérculos", 77, 0.6, 18.4, 0.1, 2.2, [{ label: "1 unidade média", grams: 100 }]),
  F("Mandioca cozida", "Cereais e Tubérculos", 125, 0.6, 30.1, 0.3, 1.6, [{ label: "1 pedaço médio", grams: 90 }]),
  F("Banana prata", "Frutas", 98, 1.3, 26, 0.1, 2, [{ label: "1 unidade", grams: 70 }]),
  F("Maçã", "Frutas", 56, 0.3, 15.2, 0, 1.3, [{ label: "1 unidade", grams: 130 }]),
  F("Mamão papaya", "Frutas", 40, 0.6, 10.4, 0.1, 1, [{ label: "1 fatia média", grams: 150 }]),
  F("Laranja", "Frutas", 45, 1, 11.5, 0.1, 4.1, [{ label: "1 unidade", grams: 180 }]),
  F("Morango", "Frutas", 30, 0.9, 6.8, 0.3, 1.7, [{ label: "1 xícara", grams: 150 }]),
  F("Abacate", "Frutas", 96, 1.2, 6, 8.4, 6.3, [{ label: "1 colher de sopa", grams: 30 }]),
  F("Uva", "Frutas", 53, 0.6, 13.3, 0.2, 0.9, [{ label: "1 cacho pequeno", grams: 100 }]),
  F("Manga", "Frutas", 64, 0.4, 16.7, 0.2, 1.8, [{ label: "1 unidade média", grams: 200 }]),
  F("Alface", "Verduras e Legumes", 15, 1.3, 2.4, 0.2, 1.7, [{ label: "1 folha", grams: 15 }, { label: "1 xícara", grams: 40 }]),
  F("Tomate", "Verduras e Legumes", 15, 1.1, 3.1, 0.2, 1.2, [{ label: "1 unidade média", grams: 90 }]),
  F("Cenoura crua", "Verduras e Legumes", 34, 1.3, 7.7, 0.2, 3.2, [{ label: "1 unidade média", grams: 80 }]),
  F("Brócolis cozido", "Verduras e Legumes", 25, 2.1, 4.4, 0.3, 3.4, [{ label: "1 xícara", grams: 100 }]),
  F("Abobrinha refogada", "Verduras e Legumes", 19, 1.2, 4.2, 0.2, 1.1, [{ label: "1 colher de sopa", grams: 25 }]),
  F("Couve refogada", "Verduras e Legumes", 39, 2, 3.9, 1.9, 2.3, [{ label: "1 colher de sopa", grams: 20 }]),
  F("Cebola", "Verduras e Legumes", 39, 1.7, 8.9, 0.1, 2.2, [{ label: "1 unidade média", grams: 70 }]),
  F("Feijão carioca cozido", "Leguminosas", 76, 4.8, 13.6, 0.5, 8.5, [{ label: "1 concha", grams: 80 }]),
  F("Lentilha cozida", "Leguminosas", 93, 6.3, 16.3, 0.5, 7.9, [{ label: "1 concha", grams: 80 }]),
  F("Grão-de-bico cozido", "Leguminosas", 121, 7.5, 20.3, 1.9, 6.7, [{ label: "1 concha", grams: 80 }]),
  F("Peito de frango grelhado", "Carnes, Aves, Peixes e Ovos", 159, 32, 0, 2.5, 0, [{ label: "1 filé médio", grams: 120 }]),
  F("Carne bovina patinho grelhada", "Carnes, Aves, Peixes e Ovos", 219, 35.9, 0, 7.3, 0, [{ label: "1 bife médio", grams: 100 }]),
  F("Ovo de galinha cozido", "Carnes, Aves, Peixes e Ovos", 146, 13.3, 0.6, 9.5, 0, [{ label: "1 unidade", grams: 50 }]),
  F("Ovo de galinha frito", "Carnes, Aves, Peixes e Ovos", 196, 15.6, 0.6, 14.5, 0, [{ label: "1 unidade", grams: 50 }]),
  F("Filé de tilápia grelhado", "Carnes, Aves, Peixes e Ovos", 128, 26, 0, 2, 0, [{ label: "1 filé médio", grams: 120 }]),
  F("Salmão grelhado", "Carnes, Aves, Peixes e Ovos", 208, 22, 0, 13, 0, [{ label: "1 posta média", grams: 120 }]),
  F("Leite desnatado", "Laticínios", 35, 3.4, 4.9, 0.2, 0, [{ label: "1 copo", grams: 200 }]),
  F("Iogurte natural desnatado", "Laticínios", 41, 4.4, 4.6, 0.4, 0, [{ label: "1 pote", grams: 170 }]),
  F("Queijo minas frescal", "Laticínios", 264, 17.4, 3.2, 20.2, 0, [{ label: "1 fatia", grams: 30 }]),
  F("Queijo muçarela", "Laticínios", 330, 22.6, 2.6, 25.2, 0, [{ label: "1 fatia", grams: 20 }]),
  F("Requeijão light", "Laticínios", 172, 10.5, 4.5, 12.9, 0, [{ label: "1 colher de sopa", grams: 20 }]),
  F("Azeite de oliva extra virgem", "Oleaginosas e Gorduras", 884, 0, 0, 100, 0, [{ label: "1 colher de sopa", grams: 13 }, { label: "1 colher de chá", grams: 4.5 }]),
  F("Castanha do Pará", "Oleaginosas e Gorduras", 656, 14.3, 12.3, 66.4, 7.5, [{ label: "1 unidade", grams: 5 }]),
  F("Amêndoas", "Oleaginosas e Gorduras", 581, 21.2, 21.7, 49.9, 12.2, [{ label: "1 unidade", grams: 1.2 }]),
  F("Pasta de amendoim integral", "Oleaginosas e Gorduras", 588, 25, 20, 50, 6, [{ label: "1 colher de sopa", grams: 16 }]),
  F("Café sem açúcar", "Bebidas", 2, 0.1, 0.3, 0, 0, [{ label: "1 xícara", grams: 100 }]),
  F("Suco de laranja natural", "Bebidas", 37, 0.7, 8.7, 0.1, 0.4, [{ label: "1 copo", grams: 200 }]),
  F("Mel", "Doces e Outros", 309, 0.4, 84, 0, 0.2, [{ label: "1 colher de sopa", grams: 20 }]),
  F("Chocolate amargo 70%", "Doces e Outros", 546, 7.9, 45.9, 31.3, 11, [{ label: "1 quadradinho", grams: 8 }]),
  F("Whey protein (pó)", "Doces e Outros", 375, 75, 8, 5, 0, [{ label: "1 scoop (30g)", grams: 30 }]),

  // Banco ampliado — valores de referência por 100 g; preparação/marca pode alterar a composição.
  // Cereais e tubérculos
  F("Cuscuz de milho cozido", "Cereais e Tubérculos", 112, 2.2, 25.3, 0.7, 2.1, [{ label: "1 fatia média", grams: 100 }, { label: "4 colheres de sopa", grams: 100 }]),
  F("Macarrão integral cozido", "Cereais e Tubérculos", 124, 5.3, 26.5, 0.5, 4.5, [{ label: "1 pegador médio", grams: 110 }, { label: "1 xícara", grams: 140 }]),
  F("Pão de forma branco", "Cereais e Tubérculos", 253, 8.1, 49.9, 3.1, 2.7, [{ label: "1 fatia", grams: 25 }]),
  F("Pão sírio", "Cereais e Tubérculos", 275, 9.1, 55.7, 1.2, 2.2, [{ label: "1 unidade média", grams: 60 }]),
  F("Pão de queijo", "Cereais e Tubérculos", 363, 5.1, 34.2, 24.6, 0.6, [{ label: "1 unidade média", grams: 30 }]),
  F("Torrada integral", "Cereais e Tubérculos", 377, 11.3, 67.5, 7.5, 6.8, [{ label: "1 unidade", grams: 10 }]),
  F("Granola tradicional", "Cereais e Tubérculos", 407, 10.1, 68.4, 11.3, 7.2, [{ label: "1 colher de sopa", grams: 15 }]),
  F("Farinha de aveia", "Cereais e Tubérculos", 394, 13.9, 67, 8.5, 9.1, [{ label: "1 colher de sopa", grams: 15 }]),
  F("Farinha de mandioca", "Cereais e Tubérculos", 361, 1.6, 87.9, 0.3, 6.4, [{ label: "1 colher de sopa", grams: 15 }]),
  F("Polenta cozida", "Cereais e Tubérculos", 103, 2.3, 23.3, 0.3, 1.7, [{ label: "1 fatia média", grams: 100 }]),
  F("Inhame cozido", "Cereais e Tubérculos", 97, 2.1, 23.2, 0.2, 1.7, [{ label: "1 unidade média", grams: 100 }]),
  F("Cará cozido", "Cereais e Tubérculos", 78, 1.5, 18.9, 0.1, 2.6, [{ label: "1 pedaço médio", grams: 100 }]),
  F("Abóbora cabotiá cozida", "Cereais e Tubérculos", 48, 1.4, 10.8, 0.7, 2.6, [{ label: "2 colheres de sopa cheias", grams: 72 }]),
  F("Milho verde cozido", "Cereais e Tubérculos", 98, 3.2, 21.2, 2.4, 2.9, [{ label: "1 espiga média", grams: 100 }, { label: "4 colheres de sopa", grams: 80 }]),

  // Frutas
  F("Banana nanica", "Frutas", 92, 1.4, 23.8, 0.1, 1.9, [{ label: "1 unidade média", grams: 90 }]),
  F("Banana maçã", "Frutas", 87, 1.8, 22.3, 0.1, 2.6, [{ label: "1 unidade média", grams: 65 }]),
  F("Abacaxi", "Frutas", 48, 0.9, 12.3, 0.1, 1, [{ label: "1 fatia grande", grams: 100 }]),
  F("Melancia", "Frutas", 33, 0.9, 8.1, 0.1, 0.1, [{ label: "1 fatia média", grams: 200 }]),
  F("Melão", "Frutas", 29, 0.7, 7.5, 0, 0.3, [{ label: "1 fatia média", grams: 120 }]),
  F("Pera", "Frutas", 53, 0.6, 14, 0.1, 3, [{ label: "1 unidade média", grams: 130 }]),
  F("Kiwi", "Frutas", 51, 1.3, 11.5, 0.6, 2.7, [{ label: "1 unidade média", grams: 75 }]),
  F("Goiaba vermelha", "Frutas", 54, 1.1, 13, 0.4, 6.2, [{ label: "1 unidade média", grams: 170 }]),
  F("Tangerina", "Frutas", 38, 0.8, 9.6, 0.1, 0.9, [{ label: "1 unidade média", grams: 135 }]),
  F("Maracujá", "Frutas", 68, 2, 12.3, 2.1, 1.1, [{ label: "1 unidade média", grams: 45 }]),
  F("Acerola", "Frutas", 33, 0.9, 8, 0.2, 1.5, [{ label: "20 unidades", grams: 120 }]),
  F("Caqui", "Frutas", 71, 0.4, 19.3, 0.1, 6.5, [{ label: "1 unidade média", grams: 100 }]),
  F("Pêssego", "Frutas", 36, 0.8, 9.3, 0, 1.4, [{ label: "1 unidade média", grams: 100 }]),
  F("Ameixa fresca", "Frutas", 53, 0.8, 13.9, 0, 2.4, [{ label: "3 unidades", grams: 150 }]),
  F("Caju", "Frutas", 43, 1, 10.3, 0.3, 1.7, [{ label: "1 unidade média", grams: 100 }]),

  // Verduras e legumes
  F("Beterraba cozida", "Verduras e Legumes", 32, 1.3, 7.2, 0.1, 1.9, [{ label: "5 colheres de sopa", grams: 100 }]),
  F("Beterraba crua", "Verduras e Legumes", 49, 1.9, 11.1, 0.1, 3.4, [{ label: "5 colheres de sopa", grams: 100 }]),
  F("Cenoura cozida", "Verduras e Legumes", 30, 0.8, 6.7, 0.2, 2.6, [{ label: "4 colheres de sopa", grams: 100 }]),
  F("Chuchu cozido", "Verduras e Legumes", 19, 0.4, 4.8, 0, 1, [{ label: "5 colheres de sopa", grams: 100 }]),
  F("Berinjela cozida", "Verduras e Legumes", 24, 0.7, 5.5, 0.2, 2.5, [{ label: "3 colheres de sopa", grams: 75 }]),
  F("Quiabo refogado", "Verduras e Legumes", 63, 1.8, 10, 2.9, 4.6, [{ label: "2 colheres de sopa rasas", grams: 60 }]),
  F("Jiló cozido", "Verduras e Legumes", 27, 1.4, 6.2, 0.2, 4.8, [{ label: "2 colheres de sopa rasas", grams: 60 }]),
  F("Repolho refogado", "Verduras e Legumes", 42, 1.8, 8.7, 0.6, 2.6, [{ label: "4 colheres de sopa", grams: 72 }]),
  F("Couve-flor cozida", "Verduras e Legumes", 19, 1.2, 3.9, 0.3, 2.1, [{ label: "1 xícara", grams: 100 }]),
  F("Espinafre refogado", "Verduras e Legumes", 67, 3, 4.2, 5.4, 2.6, [{ label: "3 colheres de sopa", grams: 75 }]),
  F("Pepino", "Verduras e Legumes", 10, 0.9, 2, 0, 1.1, [{ label: "1/2 unidade média", grams: 100 }]),
  F("Pimentão verde", "Verduras e Legumes", 21, 1.1, 4.9, 0.2, 2.6, [{ label: "1 unidade média", grams: 100 }]),
  F("Vagem cozida", "Verduras e Legumes", 25, 1.8, 5.3, 0.2, 2.5, [{ label: "3 colheres de sopa", grams: 75 }]),

  // Leguminosas
  F("Feijão preto cozido", "Leguminosas", 77, 4.5, 14, 0.5, 8.4, [{ label: "1 concha", grams: 80 }]),
  F("Feijão branco cozido", "Leguminosas", 127, 8.3, 22.5, 0.6, 6.4, [{ label: "1 concha", grams: 80 }]),
  F("Feijão fradinho cozido", "Leguminosas", 78, 5.1, 13.5, 0.6, 7.5, [{ label: "1 concha", grams: 80 }]),
  F("Ervilha cozida", "Leguminosas", 74, 5.2, 13.4, 0.4, 5.1, [{ label: "4 colheres de sopa", grams: 80 }]),
  F("Soja cozida", "Leguminosas", 151, 12.5, 11.4, 7.5, 5.6, [{ label: "4 colheres de sopa", grams: 80 }]),

  // Carnes, aves, peixes e ovos
  F("Frango desfiado cozido", "Carnes, Aves, Peixes e Ovos", 163, 31.5, 0, 3.2, 0, [{ label: "1 colher de sopa cheia", grams: 20 }]),
  F("Sobrecoxa de frango sem pele assada", "Carnes, Aves, Peixes e Ovos", 233, 29.2, 0, 12.1, 0, [{ label: "1 unidade média", grams: 100 }]),
  F("Carne bovina acém cozido", "Carnes, Aves, Peixes e Ovos", 215, 27.3, 0, 11.9, 0, [{ label: "1 bife médio", grams: 100 }]),
  F("Carne bovina coxão mole grelhado", "Carnes, Aves, Peixes e Ovos", 219, 32.4, 0, 9.4, 0, [{ label: "1 bife médio", grams: 100 }]),
  F("Carne bovina músculo cozido", "Carnes, Aves, Peixes e Ovos", 194, 31.2, 0, 7, 0, [{ label: "1 pedaço médio", grams: 100 }]),
  F("Carne bovina moída patinho", "Carnes, Aves, Peixes e Ovos", 212, 30.5, 0, 9.5, 0, [{ label: "3 colheres de sopa", grams: 90 }]),
  F("Lombo suíno assado", "Carnes, Aves, Peixes e Ovos", 210, 35.7, 0, 7.5, 0, [{ label: "1 fatia média", grams: 100 }]),
  F("Atum em água drenado", "Carnes, Aves, Peixes e Ovos", 116, 25.5, 0, 0.8, 0, [{ label: "1/2 lata", grams: 85 }]),
  F("Sardinha assada", "Carnes, Aves, Peixes e Ovos", 164, 32.2, 0, 3, 0, [{ label: "1 unidade média", grams: 70 }]),
  F("Merluza assada", "Carnes, Aves, Peixes e Ovos", 122, 26.6, 0, 1.2, 0, [{ label: "1 filé médio", grams: 120 }]),
  F("Camarão cozido", "Carnes, Aves, Peixes e Ovos", 90, 19, 0, 1, 0, [{ label: "10 unidades médias", grams: 100 }]),
  F("Clara de ovo cozida", "Carnes, Aves, Peixes e Ovos", 52, 10.9, 0.7, 0.2, 0, [{ label: "1 unidade", grams: 33 }]),
  F("Omelete simples", "Carnes, Aves, Peixes e Ovos", 154, 10.6, 1.6, 11.5, 0, [{ label: "1 unidade (2 ovos)", grams: 100 }]),

  // Laticínios
  F("Leite integral", "Laticínios", 61, 3.2, 4.7, 3.5, 0, [{ label: "1 copo", grams: 200 }]),
  F("Leite semidesnatado", "Laticínios", 45, 3.3, 4.8, 1.6, 0, [{ label: "1 copo", grams: 200 }]),
  F("Iogurte natural integral", "Laticínios", 61, 3.5, 4.7, 3.3, 0, [{ label: "1 pote", grams: 170 }]),
  F("Iogurte grego natural", "Laticínios", 97, 9, 4, 5, 0, [{ label: "1 pote", grams: 100 }]),
  F("Queijo coalho", "Laticínios", 357, 24.6, 3.2, 28.3, 0, [{ label: "1 fatia média", grams: 30 }]),
  F("Ricota", "Laticínios", 140, 12.6, 3.8, 8.1, 0, [{ label: "1 fatia", grams: 30 }]),
  F("Cottage", "Laticínios", 98, 11.1, 3.4, 4.3, 0, [{ label: "2 colheres de sopa", grams: 50 }]),
  F("Cream cheese light", "Laticínios", 180, 8, 6, 14, 0, [{ label: "1 colher de sopa", grams: 20 }]),

  // Oleaginosas e gorduras
  F("Amendoim torrado sem sal", "Oleaginosas e Gorduras", 606, 22.5, 18.7, 54, 7.8, [{ label: "1 colher de sopa", grams: 15 }]),
  F("Castanha de caju", "Oleaginosas e Gorduras", 570, 18.5, 29.1, 46.3, 3.7, [{ label: "1 unidade", grams: 3 }]),
  F("Nozes", "Oleaginosas e Gorduras", 620, 14, 18.4, 59.4, 7.2, [{ label: "1 unidade", grams: 5 }]),
  F("Chia", "Oleaginosas e Gorduras", 486, 16.5, 42.1, 30.7, 34.4, [{ label: "1 colher de sopa", grams: 12 }]),
  F("Linhaça", "Oleaginosas e Gorduras", 495, 14.1, 43.3, 32.3, 33.5, [{ label: "1 colher de sopa", grams: 10 }]),
  F("Óleo de coco", "Oleaginosas e Gorduras", 892, 0, 0, 99.1, 0, [{ label: "1 colher de sopa", grams: 13 }]),
  F("Manteiga", "Oleaginosas e Gorduras", 726, 0.4, 0.1, 82.4, 0, [{ label: "1 colher de chá", grams: 5 }]),

  // Bebidas
  F("Água de coco", "Bebidas", 22, 0.7, 5.3, 0.2, 0.1, [{ label: "1 copo", grams: 200 }]),
  F("Chá sem açúcar", "Bebidas", 1, 0, 0.2, 0, 0, [{ label: "1 xícara", grams: 200 }]),
  F("Café com leite desnatado sem açúcar", "Bebidas", 18, 1.7, 2.5, 0.1, 0, [{ label: "1 xícara", grams: 150 }]),
  F("Suco de limão sem açúcar", "Bebidas", 15, 0.4, 4.2, 0.1, 0.4, [{ label: "1 copo", grams: 200 }]),
  F("Refrigerante zero", "Bebidas", 0, 0, 0, 0, 0, [{ label: "1 lata", grams: 350 }]),

  // Doces e outros
  F("Cacau em pó 100%", "Doces e Outros", 228, 19.6, 57.9, 13.7, 37, [{ label: "1 colher de sopa", grams: 10 }]),
  F("Geleia de frutas", "Doces e Outros", 250, 0.4, 65, 0.1, 1, [{ label: "1 colher de sopa", grams: 20 }]),
  F("Açúcar mascavo", "Doces e Outros", 369, 0.8, 94.5, 0.1, 0, [{ label: "1 colher de sopa", grams: 12 }]),
  F("Paçoca", "Doces e Outros", 487, 16, 52.4, 26.1, 7.3, [{ label: "1 unidade", grams: 20 }]),
  F("Chocolate ao leite", "Doces e Outros", 540, 7.2, 59.4, 30.3, 2.2, [{ label: "1 quadradinho", grams: 8 }]),
];

const DEFAULT_MEAL_TEMPLATE = [
  { name: "Café da manhã", time: "07:00" },
  { name: "Lanche da manhã", time: "10:00" },
  { name: "Almoço", time: "12:30" },
  { name: "Lanche da tarde", time: "15:30" },
  { name: "Jantar", time: "19:00" },
  { name: "Ceia", time: "21:30" },
];

let _idSeq = 1;
const uid = (p) => p + (_idSeq++) + "_" + Math.random().toString(36).slice(2, 7);

const newMeal = (name = "Nova refeição", time = "12:00") => ({
  id: uid("meal_"), name, time, items: [], notes: ""
});

const newDiet = (patientId) => ({
  id: uid("diet_"),
  patientId,
  name: "Nova dieta",
  createdAt: new Date().toISOString(),
  goalNote: "",
  meals: DEFAULT_MEAL_TEMPLATE.map(m => newMeal(m.name, m.time)),
});

const SEED_PATIENTS = [
  { id: "p1", name: "Marina Souza", birthDate: "1994-03-12", sex: "Feminino", weight: "64", height: "165", goal: "Emagrecimento", notes: "Pratica corrida 3x/semana.", consultDate: "2026-08-10" },
  { id: "p2", name: "Carlos Andrade", birthDate: "1987-07-22", sex: "Masculino", weight: "82", height: "178", goal: "Hipertrofia", notes: "Treina musculação 5x/semana.", consultDate: "2026-08-14" },
];

/* ============================================================
   NUTRITION HELPERS
   ============================================================ */
const round1 = (n) => Math.round(n * 10) / 10;

function itemMacros(food, grams) {
  const f = grams / 100;
  return {
    kcal: food.per100.kcal * f,
    protein: food.per100.protein * f,
    carbs: food.per100.carbs * f,
    fat: food.per100.fat * f,
    fiber: food.per100.fiber * f,
    grams,
  };
}

function sumMacros(list) {
  return list.reduce((acc, m) => ({
    kcal: acc.kcal + m.kcal, protein: acc.protein + m.protein,
    carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat, fiber: acc.fiber + m.fiber,
  }), { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
}

function calcAge(birthDate) {
  if (!birthDate) return null;
  const b = new Date(birthDate);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
}

function fmtDate(iso) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return d ? `${d}/${m}/${y}` : iso;
}

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
const Btn = ({ children, variant = "ghost", size = "md", icon: Icon, style, ...rest }) => {
  const sizes = { sm: { padding: "6px 10px", fontSize: 13 }, md: { padding: "9px 14px", fontSize: 14 }, lg: { padding: "12px 20px", fontSize: 15 } };
  const variants = {
    primary: { background: "var(--primary)", color: "#fff", border: "1px solid var(--primary)" },
    accent: { background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)" },
    ghost: { background: "#fff", color: "var(--text)", border: "1px solid var(--border)" },
    subtle: { background: "var(--surface-alt)", color: "var(--primary-dark)", border: "1px solid var(--border)" },
    danger: { background: "#fff", color: "var(--danger)", border: "1px solid var(--danger-light)" },
  };
  return (
    <button
      {...rest}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8,
        fontWeight: 600, transition: "all .12s ease", whiteSpace: "nowrap",
        ...sizes[size], ...variants[variant], ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.96)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
};

const Card = ({ children, style, ...rest }) => (
  <div {...rest} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", ...style }}>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
    {label}
    {children}
  </label>
);

const inputStyle = {
  border: "1px solid var(--border)", borderRadius: 8, padding: "9px 11px",
  fontSize: 14, color: "var(--text)", background: "#fff", outline: "none", width: "100%",
};

const Pill = ({ children, color = "var(--primary)", bg = "var(--primary-light)" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 700, color, background: bg }}>
    {children}
  </span>
);

/* Macro ring — signature visual: circular plate divided by macro proportion */
const MacroRing = ({ protein, carbs, fat, size = 132, kcal }) => {
  const totalG = protein + carbs + fat || 1;
  const pPct = protein / totalG, cPct = carbs / totalG, fPct = fat / totalG;
  const r = size / 2 - 12, C = 2 * Math.PI * r;
  const segs = [
    { pct: pPct, color: "var(--protein)" },
    { pct: cPct, color: "var(--carbs)" },
    { pct: fPct, color: "var(--fat)" },
  ];
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-alt)" strokeWidth={12} />
        {segs.map((s, i) => {
          const len = s.pct * C;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={12}
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} strokeLinecap="butt" />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="npx-mono" style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{Math.round(kcal)}</div>
        <div style={{ fontSize: 10.5, color: "var(--text-muted)", fontWeight: 600 }}>kcal</div>
      </div>
    </div>
  );
};

const MacroBar = ({ label, value, unit = "g", color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
    <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }} />
    <span style={{ color: "var(--text-muted)", minWidth: 68 }}>{label}</span>
    <span className="npx-mono" style={{ fontWeight: 700 }}>{round1(value)}{unit}</span>
  </div>
);

/* ============================================================
   FOOD PICKER (search + dropdown), used inside a meal
   ============================================================ */
const FoodPicker = ({ foods, onPick }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.trim().toLowerCase();
    return foods.filter(f => f.name.toLowerCase().includes(s)).slice(0, 8);
  }, [q, foods]);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-soft)" }} />
        <input
          style={{ ...inputStyle, paddingLeft: 32 }}
          placeholder="Pesquisar alimento para adicionar…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && results.length > 0 && (
        <div className="npx-scroll" style={{
          position: "absolute", zIndex: 20, top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: "1px solid var(--border)", borderRadius: 10,
          boxShadow: "0 8px 24px rgba(30,42,32,0.12)", maxHeight: 280, overflowY: "auto"
        }}>
          {results.map(f => (
            <button key={f.id} onClick={() => { onPick(f); setQ(""); setOpen(false); }}
              style={{
                width: "100%", textAlign: "left", padding: "9px 12px", border: "none",
                borderBottom: "1px solid var(--border)", background: "#fff", display: "flex",
                justifyContent: "space-between", alignItems: "center", gap: 8
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-alt)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
            >
              <span>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{f.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{f.category}</div>
              </span>
              <span className="npx-mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{f.per100.kcal} kcal/100g</span>
            </button>
          ))}
        </div>
      )}
      {open && q && (
        <div className="no-print" style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

/* ============================================================
   DIET ITEM ROW
   ============================================================ */
const bestHouseholdMeasure = (food, grams) => {
  const candidates = food.measures.filter(m => !m.label.startsWith("g") && m.grams > 0);
  if (!candidates.length) return null;
  const scored = candidates.map(m => {
    const qty = grams / m.grams;
    // Prefer quantidades legíveis e próximas de frações comuns.
    const common = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4];
    const dist = Math.min(...common.map(v => Math.abs(qty - v)));
    return { measure: m, qty, score: dist + (qty > 6 ? 2 : 0) };
  });
  return scored.sort((a, b) => a.score - b.score)[0];
};

const EquivalentPanel = ({ baseFood, baseGrams, foods, selectedSubstitutes = [], onToggleSubstitute }) => {
  const targetKcal = itemMacros(baseFood, baseGrams).kcal;
  const equivalents = foods
    .filter(f => f.id !== baseFood.id && f.category === baseFood.category && f.per100.kcal > 0)
    .map(f => {
      // kcal alvo = kcal/100g do substituto × gramas/100
      const exactGrams = (targetKcal * 100) / f.per100.kcal;
      const exactMacros = itemMacros(f, exactGrams);
      const household = bestHouseholdMeasure(f, exactGrams);
      return { food: f, exactGrams, exactMacros, household };
    })
    .sort((a, b) => Math.abs(a.exactGrams - baseGrams) - Math.abs(b.exactGrams - baseGrams));

  return (
    <div style={{ gridColumn: "1 / -1", margin: "2px 0 8px", padding: 12, borderRadius: 9, background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--primary-dark)" }}>Substitutos com equivalência calórica exata</div>
          <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Base: {round1(baseGrams)}g de {baseFood.name} = <strong>{round1(targetKcal)} kcal</strong></div>
        </div>
        <Pill>{equivalents.length} opções</Pill>
      </div>
      {equivalents.length === 0 ? (
        <div style={{ fontSize: 12, color: "var(--text-soft)" }}>Nenhum outro alimento com calorias cadastradas nesta categoria.</div>
      ) : (
        <div style={{ display: "grid", gap: 6 }}>
          {equivalents.map(({ food: f, exactGrams, exactMacros, household }) => (
            <div key={f.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) 90px minmax(130px,1fr) 78px auto", gap: 8, alignItems: "center", padding: "8px 9px", background: "#fff", border: "1px solid var(--border)", borderRadius: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                <div style={{ fontSize: 10.5, color: "var(--text-muted)" }}>{f.per100.kcal} kcal/100g</div>
              </div>
              <div className="npx-mono" style={{ fontSize: 12, fontWeight: 700 }}>{round1(exactGrams)}g</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {household ? `≈ ${Math.round(household.qty * 100) / 100} × ${household.measure.label}` : "usar em gramas"}
              </div>
              <div className="npx-mono" style={{ fontSize: 11.5, color: "var(--primary-dark)", fontWeight: 700 }}>{round1(exactMacros.kcal)} kcal</div>
              <Btn className="no-print" size="sm" variant={selectedSubstitutes.some(s => s.foodId === f.id) ? "primary" : "subtle"} onClick={() => onToggleSubstitute(f, exactGrams, household)}>{selectedSubstitutes.some(s => s.foodId === f.id) ? "Adicionado" : "Adicionar"}</Btn>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 10.5, color: "var(--text-soft)" }}>Selecione quantas opções quiser. Elas ficam vinculadas ao alimento base como alternativas para dar mais variedade ao paciente, sempre mantendo a equivalência calórica calculada.</div>
    </div>
  );
};

const ItemRow = ({ item, food, foods, onChange, onRemove, onMove, isFirst, isLast }) => {
  const [showEquivalents, setShowEquivalents] = useState(false);
  const measure = food.measures.find(m => m.label === item.measureLabel) || food.measures[0];
  const grams = measure.label.startsWith("g") ? item.qty : round1(item.qty * measure.grams);
  const macros = itemMacros(food, grams);

  const selectedSubstitutes = item.substitutes || [];
  const toggleSubstitute = (replacement, exactGrams, household) => {
    const exists = selectedSubstitutes.some(s => s.foodId === replacement.id);
    const next = exists
      ? selectedSubstitutes.filter(s => s.foodId !== replacement.id)
      : [...selectedSubstitutes, {
          foodId: replacement.id,
          grams: Math.round(exactGrams * 1000) / 1000,
          householdText: household ? `≈ ${Math.round(household.qty * 100) / 100} × ${household.measure.label}` : "usar em gramas"
        }];
    onChange({ ...item, substitutes: next });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.7fr) 76px minmax(0,1.3fr) 80px 1fr auto", gap: 10, alignItems: "center", padding: "10px 4px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{food.name}</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{round1(macros.kcal)} kcal · {round1(grams)}g</div>
        <button className="no-print" onClick={() => setShowEquivalents(v => !v)} style={{ border: "none", background: "transparent", padding: "3px 0 0", color: "var(--primary)", fontSize: 11, fontWeight: 700 }}>
          {showEquivalents ? "Ocultar equivalentes" : "Ver substitutos equivalentes"}
        </button>
      </div>
      <input type="number" min="0" step="0.5" value={item.qty}
        onChange={(e) => onChange({ ...item, qty: parseFloat(e.target.value) || 0 })}
        style={{ ...inputStyle, padding: "6px 8px", textAlign: "center" }} />
      <select value={item.measureLabel} onChange={(e) => onChange({ ...item, measureLabel: e.target.value })}
        style={{ ...inputStyle, padding: "6px 8px", fontSize: 12.5 }}>
        {food.measures.map(m => <option key={m.label} value={m.label}>{m.label}</option>)}
      </select>
      <div className="npx-mono" style={{ fontSize: 12, textAlign: "center", color: "var(--text-muted)" }}>{round1(grams)}g</div>
      <div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap" }} className="npx-mono">
        <span style={{ color: "var(--protein)" }}>P {round1(macros.protein)}</span>
        <span style={{ color: "var(--carbs)" }}>C {round1(macros.carbs)}</span>
        <span style={{ color: "var(--fat)" }}>G {round1(macros.fat)}</span>
      </div>
      <div className="no-print" style={{ display: "flex", gap: 2 }}>
        <button onClick={() => onMove(-1)} disabled={isFirst} title="Mover para cima" style={{ border: "none", background: "transparent", padding: 3, opacity: isFirst ? 0.3 : 1 }}><ChevronUp size={14} /></button>
        <button onClick={() => onMove(1)} disabled={isLast} title="Mover para baixo" style={{ border: "none", background: "transparent", padding: 3, opacity: isLast ? 0.3 : 1 }}><ChevronDown size={14} /></button>
        <button onClick={onRemove} title="Remover" style={{ border: "none", background: "transparent", padding: 3, color: "var(--danger)" }}><Trash2 size={14} /></button>
      </div>
      {selectedSubstitutes.length > 0 && (
        <div style={{ gridColumn: "1 / -1", padding: "7px 10px", marginTop: 2, background: "#fff", borderLeft: "3px solid var(--primary-light)", fontSize: 11.5, color: "var(--text-muted)" }}>
          <strong style={{ color: "var(--primary-dark)" }}>Substituições:</strong>{" "}
          {selectedSubstitutes.map((sub, i) => {
            const sf = foods.find(f => f.id === sub.foodId);
            if (!sf) return null;
            return <span key={sub.foodId}>{i > 0 ? " • " : ""}{sf.name} — {round1(sub.grams)}g{sub.householdText ? ` (${sub.householdText})` : ""}</span>;
          })}
        </div>
      )}
      {showEquivalents && <EquivalentPanel baseFood={food} baseGrams={grams} foods={foods} selectedSubstitutes={selectedSubstitutes} onToggleSubstitute={toggleSubstitute} />}
    </div>
  );
};

/* ============================================================
   MEAL CARD
   ============================================================ */
const MealCard = ({ meal, foods, onUpdateMeal, onRemoveMeal, onDuplicateMeal, onMoveMeal, isFirst, isLast, allowRemove }) => {
  const itemsWithFood = meal.items.map(it => ({ item: it, food: foods.find(f => f.id === it.foodId) })).filter(x => x.food);
  const macrosList = itemsWithFood.map(({ item, food }) => {
    const measure = food.measures.find(m => m.label === item.measureLabel) || food.measures[0];
    const grams = measure.label.startsWith("g") ? item.qty : item.qty * measure.grams;
    return itemMacros(food, grams);
  });
  const totals = sumMacros(macrosList);

  const addFood = (food) => {
    const defaultMeasure = food.measures[0];
    const newItem = { id: uid("it_"), foodId: food.id, qty: 1, measureLabel: defaultMeasure.label };
    onUpdateMeal({ ...meal, items: [...meal.items, newItem] });
  };
  const updateItem = (idx, next) => {
    const items = [...meal.items]; items[idx] = next;
    onUpdateMeal({ ...meal, items });
  };
  const removeItem = (idx) => {
    onUpdateMeal({ ...meal, items: meal.items.filter((_, i) => i !== idx) });
  };
  const moveItem = (idx, dir) => {
    const items = [...meal.items];
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    [items[idx], items[target]] = [items[target], items[idx]];
    onUpdateMeal({ ...meal, items });
  };

  return (
    <Card style={{ padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input value={meal.name} onChange={(e) => onUpdateMeal({ ...meal, name: e.target.value })}
            className="npx-display" style={{ border: "none", fontSize: 17, fontWeight: 600, background: "transparent", color: "var(--primary-dark)", width: 200 }} />
          <input type="time" value={meal.time} onChange={(e) => onUpdateMeal({ ...meal, time: e.target.value })}
            style={{ ...inputStyle, padding: "4px 8px", width: 100, fontSize: 12.5 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="npx-mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--primary-dark)" }}>{Math.round(totals.kcal)} kcal</span>
          <div className="no-print" style={{ display: "flex", gap: 2 }}>
            <button onClick={() => onMoveMeal(-1)} disabled={isFirst} title="Mover refeição para cima" style={{ border: "none", background: "transparent", padding: 4, opacity: isFirst ? 0.3 : 1 }}><ChevronUp size={15} /></button>
            <button onClick={() => onMoveMeal(1)} disabled={isLast} title="Mover refeição para baixo" style={{ border: "none", background: "transparent", padding: 4, opacity: isLast ? 0.3 : 1 }}><ChevronDown size={15} /></button>
            <button onClick={onDuplicateMeal} title="Duplicar refeição" style={{ border: "none", background: "transparent", padding: 4 }}><Copy size={14} /></button>
            {allowRemove && <button onClick={onRemoveMeal} title="Remover refeição" style={{ border: "none", background: "transparent", padding: 4, color: "var(--danger)" }}><Trash2 size={14} /></button>}
          </div>
        </div>
      </div>

      {itemsWithFood.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.7fr) 76px minmax(0,1.3fr) 80px 1fr auto", gap: 10, padding: "0 4px 6px", fontSize: 10.5, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            <span>Alimento</span><span style={{ textAlign: "center" }}>Qtd.</span><span>Medida</span><span style={{ textAlign: "center" }}>Peso</span><span>Macros (g)</span><span></span>
          </div>
          {itemsWithFood.map(({ item, food }, idx) => (
            <ItemRow key={item.id} item={item} food={food} foods={foods}
              onChange={(next) => updateItem(idx, next)}
              onRemove={() => removeItem(idx)}
              onMove={(dir) => moveItem(idx, dir)}
              isFirst={idx === 0} isLast={idx === itemsWithFood.length - 1} />
          ))}
        </div>
      )}
      {itemsWithFood.length === 0 && (
        <div style={{ padding: "14px 4px", color: "var(--text-soft)", fontSize: 13, fontStyle: "italic" }}>Nenhum alimento adicionado ainda.</div>
      )}

      <div className="no-print" style={{ marginBottom: 10 }}>
        <FoodPicker foods={foods} onPick={addFood} />
      </div>

      <textarea placeholder="Observações e orientações para esta refeição (opcional)"
        value={meal.notes} onChange={(e) => onUpdateMeal({ ...meal, notes: e.target.value })}
        rows={meal.notes ? 2 : 1}
        style={{ ...inputStyle, resize: "vertical", fontSize: 12.5, color: "var(--text-muted)" }} />
    </Card>
  );
};

/* ============================================================
   DASHBOARD
   ============================================================ */
const Dashboard = ({ patients, diets, foods, goTo }) => {
  const recentDiets = [...diets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const mostUsed = [...foods].sort((a, b) => b.usageCount - a.usageCount).filter(f => f.usageCount > 0).slice(0, 5);

  const stat = (label, value, Icon, color) => (
    <Card style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 150 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: color + "1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div className="npx-display" style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
        <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{label}</div>
      </div>
    </Card>
  );

  return (
    <div>
      <h1 className="npx-display" style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Olá, @hlnutri</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14.5 }}>Aqui está um panorama rápido do @hlnutri.</p>

      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        {stat("Pacientes cadastrados", patients.length, Users, "#171512")}
        {stat("Dietas criadas", diets.length, ClipboardList, "#B08D57")}
        {stat("Alimentos no banco", foods.length, Apple, "#8A8168")}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <Btn variant="primary" icon={Plus} onClick={() => goTo("dietEditor", { dietId: null })}>Nova dieta</Btn>
        <Btn variant="ghost" icon={Users} onClick={() => goTo("patients")}>Buscar paciente</Btn>
        <Btn variant="ghost" icon={Apple} onClick={() => goTo("foods")}>Banco de alimentos</Btn>
        <Btn variant="ghost" icon={ClipboardList} onClick={() => goTo("diets")}>Dietas salvas</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <Card style={{ padding: 18 }}>
          <h3 className="npx-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Dietas recentes</h3>
          {recentDiets.length === 0 && <p style={{ color: "var(--text-soft)", fontSize: 13.5 }}>Nenhuma dieta criada ainda. Comece uma nova dieta acima.</p>}
          {recentDiets.map(d => {
            const patient = patients.find(p => p.id === d.patientId);
            const totals = sumMacros(d.meals.flatMap(m => m.items.map(it => {
              const food = foods.find(f => f.id === it.foodId); if (!food) return null;
              const measure = food.measures.find(mm => mm.label === it.measureLabel) || food.measures[0];
              const grams = measure.label.startsWith("g") ? it.qty : it.qty * measure.grams;
              return itemMacros(food, grams);
            }).filter(Boolean)));
            return (
              <div key={d.id} onClick={() => goTo("dietEditor", { dietId: d.id })}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 6px", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{patient ? patient.name : "Paciente removido"}</div>
                </div>
                <Pill>{Math.round(totals.kcal)} kcal</Pill>
              </div>
            );
          })}
        </Card>
        <Card style={{ padding: 18 }}>
          <h3 className="npx-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Alimentos mais usados</h3>
          {mostUsed.length === 0 && <p style={{ color: "var(--text-soft)", fontSize: 13.5 }}>Monte dietas para ver seus alimentos favoritos aqui.</p>}
          {mostUsed.map(f => (
            <div key={f.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 6px", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
              <span>{f.name}</span>
              <span className="npx-mono" style={{ color: "var(--text-muted)" }}>{f.usageCount}x</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

/* ============================================================
   PATIENT FORM (modal-like inline card)
   ============================================================ */
const PatientForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { name: "", birthDate: "", sex: "Feminino", weight: "", height: "", goal: "", notes: "", consultDate: new Date().toISOString().slice(0, 10) });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSave = form.name.trim().length > 0;

  return (
    <Card style={{ padding: 20, marginBottom: 20, border: "1px solid var(--border-strong)" }}>
      <h3 className="npx-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>{initial ? "Editar paciente" : "Novo paciente"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
        <Field label="Nome completo"><input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Nome do paciente" /></Field>
        <Field label="Data de nascimento"><input type="date" style={inputStyle} value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)} /></Field>
        <Field label="Sexo">
          <select style={inputStyle} value={form.sex} onChange={(e) => set("sex", e.target.value)}>
            <option>Feminino</option><option>Masculino</option><option>Outro</option>
          </select>
        </Field>
        <Field label="Peso (kg)"><input type="number" style={inputStyle} value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="Ex: 68" /></Field>
        <Field label="Altura (cm)"><input type="number" style={inputStyle} value={form.height} onChange={(e) => set("height", e.target.value)} placeholder="Ex: 170" /></Field>
        <Field label="Data da consulta"><input type="date" style={inputStyle} value={form.consultDate} onChange={(e) => set("consultDate", e.target.value)} /></Field>
        <Field label="Objetivo"><input style={inputStyle} value={form.goal} onChange={(e) => set("goal", e.target.value)} placeholder="Ex: Emagrecimento, hipertrofia…" /></Field>
      </div>
      <Field label="Observações">
        <textarea rows={2} style={{ ...inputStyle, resize: "vertical" }} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Restrições, preferências, histórico…" />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <Btn variant="primary" icon={Check} disabled={!canSave} style={{ opacity: canSave ? 1 : 0.5 }} onClick={() => canSave && onSave(form)}>Salvar paciente</Btn>
        <Btn variant="ghost" icon={X} onClick={onCancel}>Cancelar</Btn>
      </div>
    </Card>
  );
};

/* ============================================================
   PATIENTS VIEW
   ============================================================ */
const PatientsView = ({ patients, diets, setPatients, goTo }) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  const filtered = patients.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const save = (form) => {
    if (editing) {
      setPatients(ps => ps.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
    } else {
      setPatients(ps => [...ps, { ...form, id: uid("p") }]);
    }
    setShowForm(false); setEditing(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <h1 className="npx-display" style={{ fontSize: 24, fontWeight: 600 }}>Pacientes</h1>
        <Btn variant="primary" icon={Plus} onClick={() => { setEditing(null); setShowForm(true); }}>Novo paciente</Btn>
      </div>

      {showForm && <PatientForm initial={editing} onSave={save} onCancel={() => { setShowForm(false); setEditing(null); }} />}

      <div style={{ position: "relative", marginBottom: 16, maxWidth: 360 }}>
        <Search size={15} style={{ position: "absolute", left: 10, top: 11, color: "var(--text-soft)" }} />
        <input style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Buscar paciente pelo nome…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <Card style={{ overflow: "hidden" }}>
        {filtered.length === 0 && <div style={{ padding: 24, color: "var(--text-soft)", textAlign: "center" }}>Nenhum paciente encontrado.</div>}
        {filtered.map((p, i) => {
          const dietCount = diets.filter(d => d.patientId === p.id).length;
          return (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div onClick={() => goTo("patientDetail", { patientId: p.id })} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "Fraunces, serif" }}>
                  {p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{p.goal || "Sem objetivo definido"} · {dietCount} dieta{dietCount !== 1 ? "s" : ""}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn size="sm" variant="ghost" icon={Pencil} onClick={() => { setEditing(p); setShowForm(true); }}>Editar</Btn>
                <Btn size="sm" variant="subtle" icon={ChevronRight} onClick={() => goTo("patientDetail", { patientId: p.id })}>Ver ficha</Btn>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

/* ============================================================
   PATIENT DETAIL VIEW
   ============================================================ */
const PatientDetailView = ({ patient, diets, foods, goTo, onDeleteDiet, onDuplicateDiet }) => {
  if (!patient) return <div>Paciente não encontrado. <Btn variant="ghost" onClick={() => goTo("patients")}>Voltar</Btn></div>;
  const patientDiets = diets.filter(d => d.patientId === patient.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const age = calcAge(patient.birthDate);
  const bmi = patient.weight && patient.height ? (parseFloat(patient.weight) / Math.pow(parseFloat(patient.height) / 100, 2)) : null;

  return (
    <div>
      <button onClick={() => goTo("patients")} className="no-print" style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "var(--text-muted)", marginBottom: 12, fontSize: 13, fontWeight: 600 }}>
        <ArrowLeft size={15} /> Voltar para pacientes
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, marginBottom: 24 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17, fontFamily: "Fraunces, serif" }}>
              {patient.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <div className="npx-display" style={{ fontSize: 19, fontWeight: 600 }}>{patient.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{age !== null ? `${age} anos` : ""} · {patient.sex}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13, marginBottom: 12 }}>
            <div><div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>Peso</div><div className="npx-mono" style={{ fontWeight: 700 }}>{patient.weight || "-"} kg</div></div>
            <div><div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>Altura</div><div className="npx-mono" style={{ fontWeight: 700 }}>{patient.height || "-"} cm</div></div>
            <div><div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>IMC</div><div className="npx-mono" style={{ fontWeight: 700 }}>{bmi ? round1(bmi) : "-"}</div></div>
            <div><div style={{ color: "var(--text-muted)", fontSize: 11.5 }}>Última consulta</div><div style={{ fontWeight: 700, fontSize: 12.5 }}>{fmtDate(patient.consultDate)}</div></div>
          </div>
          <div style={{ marginBottom: 10 }}><Pill bg="var(--accent-light)" color="var(--accent-dark)">{patient.goal || "Objetivo não definido"}</Pill></div>
          {patient.notes && <div style={{ fontSize: 12.5, color: "var(--text-muted)", background: "var(--surface-alt)", padding: 10, borderRadius: 8 }}>{patient.notes}</div>}
        </Card>

        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 className="npx-display" style={{ fontSize: 17, fontWeight: 600 }}>Dietas do paciente</h3>
            <Btn variant="primary" icon={Plus} onClick={() => goTo("dietEditor", { dietId: null, patientId: patient.id })}>Nova dieta</Btn>
          </div>
          {patientDiets.length === 0 && <p style={{ color: "var(--text-soft)", fontSize: 13.5 }}>Nenhuma dieta salva ainda para este paciente.</p>}
          {patientDiets.map(d => {
            const totals = sumMacros(d.meals.flatMap(m => m.items.map(it => {
              const food = foods.find(f => f.id === it.foodId); if (!food) return null;
              const measure = food.measures.find(mm => mm.label === it.measureLabel) || food.measures[0];
              const grams = measure.label.startsWith("g") ? it.qty : it.qty * measure.grams;
              return itemMacros(food, grams);
            }).filter(Boolean)));
            return (
              <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 4px", borderBottom: "1px solid var(--border)" }}>
                <div onClick={() => goTo("dietEditor", { dietId: d.id })} style={{ cursor: "pointer" }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{new Date(d.createdAt).toLocaleDateString("pt-BR")} · {Math.round(totals.kcal)} kcal/dia</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button title="Duplicar" onClick={() => onDuplicateDiet(d.id)} style={{ border: "none", background: "transparent", padding: 4 }}><Copy size={15} /></button>
                  <button title="Excluir" onClick={() => onDeleteDiet(d.id)} style={{ border: "none", background: "transparent", padding: 4, color: "var(--danger)" }}><Trash2 size={15} /></button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

/* ============================================================
   FOODS VIEW (banco de alimentos)
   ============================================================ */
const FoodForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState(""); const [category, setCategory] = useState(CATEGORIES[0]);
  const [kcal, setKcal] = useState(""); const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState(""); const [fat, setFat] = useState(""); const [fiber, setFiber] = useState("");
  const [measureLabel, setMeasureLabel] = useState("1 unidade"); const [measureGrams, setMeasureGrams] = useState("");
  const canSave = name.trim() && kcal !== "";

  return (
    <Card style={{ padding: 20, marginBottom: 18, border: "1px solid var(--border-strong)" }}>
      <h3 className="npx-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>Novo alimento personalizado</h3>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.3fr", gap: 12, marginBottom: 12 }}>
        <Field label="Nome do alimento"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Pão sírio integral" /></Field>
        <Field label="Categoria">
          <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--text-soft)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>Valores por 100g</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 14 }}>
        <Field label="Kcal"><input type="number" style={inputStyle} value={kcal} onChange={(e) => setKcal(e.target.value)} /></Field>
        <Field label="Proteínas (g)"><input type="number" style={inputStyle} value={protein} onChange={(e) => setProtein(e.target.value)} /></Field>
        <Field label="Carboidratos (g)"><input type="number" style={inputStyle} value={carbs} onChange={(e) => setCarbs(e.target.value)} /></Field>
        <Field label="Gorduras (g)"><input type="number" style={inputStyle} value={fat} onChange={(e) => setFat(e.target.value)} /></Field>
        <Field label="Fibras (g)"><input type="number" style={inputStyle} value={fiber} onChange={(e) => setFiber(e.target.value)} /></Field>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--text-soft)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>Medida caseira</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <Field label="Nome da medida"><input style={inputStyle} value={measureLabel} onChange={(e) => setMeasureLabel(e.target.value)} placeholder="Ex: 1 fatia" /></Field>
        <Field label="Peso correspondente (g)"><input type="number" style={inputStyle} value={measureGrams} onChange={(e) => setMeasureGrams(e.target.value)} placeholder="Ex: 30" /></Field>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn variant="primary" icon={Check} style={{ opacity: canSave ? 1 : 0.5 }} disabled={!canSave} onClick={() => canSave && onSave({
          name, category,
          per100: { kcal: parseFloat(kcal) || 0, protein: parseFloat(protein) || 0, carbs: parseFloat(carbs) || 0, fat: parseFloat(fat) || 0, fiber: parseFloat(fiber) || 0 },
          measures: measureGrams ? [{ label: measureLabel || "1 unidade", grams: parseFloat(measureGrams) }] : [],
        })}>Salvar alimento</Btn>
        <Btn variant="ghost" icon={X} onClick={onCancel}>Cancelar</Btn>
      </div>
    </Card>
  );
};

const FoodsView = ({ foods, setFoods }) => {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("Todas");
  const [showForm, setShowForm] = useState(false);
  const [onlyFav, setOnlyFav] = useState(false);

  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(q.toLowerCase()) &&
    (cat === "Todas" || f.category === cat) &&
    (!onlyFav || f.favorite)
  );

  const toggleFav = (id) => setFoods(fs => fs.map(f => f.id === id ? { ...f, favorite: !f.favorite } : f));
  const addFood = (data) => {
    setFoods(fs => [...fs, { id: uid("cf"), favorite: false, usageCount: 0, custom: true, ...data, measures: expandMeasures(data.measures) }]);
    setShowForm(false);
  };
  const removeFood = (id) => setFoods(fs => fs.filter(f => f.id !== id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <h1 className="npx-display" style={{ fontSize: 24, fontWeight: 600 }}>Banco de alimentos</h1>
        <Btn variant="primary" icon={Plus} onClick={() => setShowForm(s => !s)}>Alimento personalizado</Btn>
      </div>

      {showForm && <FoodForm onSave={addFood} onCancel={() => setShowForm(false)} />}

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px" }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: 11, color: "var(--text-soft)" }} />
          <input style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Buscar alimento…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select style={{ ...inputStyle, width: 220 }} value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>Todas</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <Btn variant={onlyFav ? "accent" : "ghost"} icon={Star} onClick={() => setOnlyFav(v => !v)}>Favoritos</Btn>
      </div>

      <Card style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "28px 2fr 1.4fr 70px 70px 70px 70px 1.2fr 32px", gap: 8, padding: "10px 16px", fontSize: 10.5, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.03em", borderBottom: "1px solid var(--border)", background: "var(--surface-alt)" }}>
          <span></span><span>Nome</span><span>Categoria</span><span>Kcal</span><span>Prot.</span><span>Carb.</span><span>Gord.</span><span>Medida caseira</span><span></span>
        </div>
        <div className="npx-scroll" style={{ maxHeight: 560, overflowY: "auto" }}>
          {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--text-soft)" }}>Nenhum alimento encontrado para esse filtro.</div>}
          {filtered.map(f => (
            <div key={f.id} style={{ display: "grid", gridTemplateColumns: "28px 2fr 1.4fr 70px 70px 70px 70px 1.2fr 32px", gap: 8, padding: "10px 16px", borderBottom: "1px solid var(--border)", alignItems: "center", fontSize: 13 }}>
              <button onClick={() => toggleFav(f.id)} style={{ border: "none", background: "transparent", padding: 0 }}>
                <Star size={16} fill={f.favorite ? "var(--accent)" : "none"} color={f.favorite ? "var(--accent)" : "var(--text-soft)"} />
              </button>
              <span style={{ fontWeight: 600 }}>{f.name}{f.custom && <Pill bg="var(--surface-alt)" color="var(--text-muted)" style={{ marginLeft: 6 }}>personalizado</Pill>}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.category}</span>
              <span className="npx-mono">{f.per100.kcal}</span>
              <span className="npx-mono" style={{ color: "var(--protein)" }}>{f.per100.protein}</span>
              <span className="npx-mono" style={{ color: "var(--carbs)" }}>{f.per100.carbs}</span>
              <span className="npx-mono" style={{ color: "var(--fat)" }}>{f.per100.fat}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.measures.filter(m => !m.label.startsWith("g")).map(m => m.label).join(", ") || "—"}</span>
              {f.custom ? <button onClick={() => removeFood(f.id)} style={{ border: "none", background: "transparent", color: "var(--danger)" }}><Trash2 size={14} /></button> : <span />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ============================================================
   DIET EDITOR VIEW
   ============================================================ */
const DietEditorView = ({ diet, patients, foods, setFoods, onChangeDiet, goTo, onSave, onExportPdf }) => {
  if (!diet) return <div>Selecione uma dieta.</div>;
  const patient = patients.find(p => p.id === diet.patientId);

  const allItemsMacros = diet.meals.flatMap(m => m.items.map(it => {
    const food = foods.find(f => f.id === it.foodId); if (!food) return null;
    const measure = food.measures.find(mm => mm.label === it.measureLabel) || food.measures[0];
    const grams = measure.label.startsWith("g") ? it.qty : it.qty * measure.grams;
    return itemMacros(food, grams);
  }).filter(Boolean));
  const totals = sumMacros(allItemsMacros);

  const updateMeal = (idx, nextMeal) => {
    const meals = [...diet.meals]; meals[idx] = nextMeal;
    onChangeDiet({ ...diet, meals });
    // bump usage counts for newly present foods
    const foodIds = new Set(nextMeal.items.map(i => i.foodId));
    setFoods(fs => fs.map(f => foodIds.has(f.id) ? { ...f, usageCount: f.usageCount } : f));
  };
  const addMeal = () => onChangeDiet({ ...diet, meals: [...diet.meals, newMeal()] });
  const removeMeal = (idx) => onChangeDiet({ ...diet, meals: diet.meals.filter((_, i) => i !== idx) });
  const duplicateMeal = (idx) => {
    const m = diet.meals[idx];
    const copy = { ...m, id: uid("meal_"), name: m.name + " (cópia)", items: m.items.map(it => ({ ...it, id: uid("it_") })) };
    const meals = [...diet.meals]; meals.splice(idx + 1, 0, copy);
    onChangeDiet({ ...diet, meals });
  };
  const moveMeal = (idx, dir) => {
    const meals = [...diet.meals]; const target = idx + dir;
    if (target < 0 || target >= meals.length) return;
    [meals[idx], meals[target]] = [meals[target], meals[idx]];
    onChangeDiet({ ...diet, meals });
  };

  return (
    <div>
      <button onClick={() => goTo("diets")} className="no-print" style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "transparent", color: "var(--text-muted)", marginBottom: 10, fontSize: 13, fontWeight: 600 }}>
        <ArrowLeft size={15} /> Voltar
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <input value={diet.name} onChange={(e) => onChangeDiet({ ...diet, name: e.target.value })}
            className="npx-display" style={{ fontSize: 26, fontWeight: 600, border: "none", background: "transparent", width: "100%", marginBottom: 6 }} />
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <select value={diet.patientId || ""} onChange={(e) => onChangeDiet({ ...diet, patientId: e.target.value })} style={{ ...inputStyle, width: 220 }}>
              <option value="">Selecionar paciente…</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Criada em {new Date(diet.createdAt).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
        <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn variant="ghost" icon={Save} onClick={onSave}>Salvar dieta</Btn>
          <Btn variant="accent" icon={FileDown} onClick={onExportPdf}>Salvar dieta em PDF</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
        <div>
          {diet.meals.map((m, idx) => (
            <MealCard key={m.id} meal={m} foods={foods}
              onUpdateMeal={(next) => updateMeal(idx, next)}
              onRemoveMeal={() => removeMeal(idx)}
              onDuplicateMeal={() => duplicateMeal(idx)}
              onMoveMeal={(dir) => moveMeal(idx, dir)}
              isFirst={idx === 0} isLast={idx === diet.meals.length - 1}
              allowRemove={diet.meals.length > 1} />
          ))}
          <Btn variant="subtle" icon={Plus} onClick={addMeal} className="no-print">Adicionar refeição</Btn>

          <Card style={{ padding: 16, marginTop: 18 }}>
            <Field label="Observações gerais da dieta">
              <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={diet.goalNote}
                onChange={(e) => onChangeDiet({ ...diet, goalNote: e.target.value })}
                placeholder="Orientações gerais, hidratação, suplementação, restrições…" />
            </Field>
          </Card>
        </div>

        <div style={{ position: "sticky", top: 16 }} className="no-print">
          <Card style={{ padding: 18, textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Total diário</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <MacroRing protein={totals.protein} carbs={totals.carbs} fat={totals.fat} kcal={totals.kcal} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
              <MacroBar label="Proteínas" value={totals.protein} color="var(--protein)" />
              <MacroBar label="Carboidratos" value={totals.carbs} color="var(--carbs)" />
              <MacroBar label="Gorduras" value={totals.fat} color="var(--fat)" />
              <MacroBar label="Fibras" value={totals.fiber} color="var(--fiber)" />
            </div>
          </Card>
          {patient && (
            <Card style={{ padding: 16 }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Paciente</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{patient.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{patient.weight}kg · {patient.height}cm</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{patient.goal}</div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   DIETS LIST VIEW
   ============================================================ */
const DietsView = ({ diets, patients, foods, goTo, onDelete, onDuplicate }) => {
  const [q, setQ] = useState("");
  const sorted = [...diets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filtered = sorted.filter(d => {
    const p = patients.find(pp => pp.id === d.patientId);
    const s = (d.name + " " + (p ? p.name : "")).toLowerCase();
    return s.includes(q.toLowerCase());
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <h1 className="npx-display" style={{ fontSize: 24, fontWeight: 600 }}>Dietas salvas</h1>
        <Btn variant="primary" icon={Plus} onClick={() => goTo("dietEditor", { dietId: null })}>Nova dieta</Btn>
      </div>
      <div style={{ position: "relative", marginBottom: 16, maxWidth: 360 }}>
        <Search size={15} style={{ position: "absolute", left: 10, top: 11, color: "var(--text-soft)" }} />
        <input style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Buscar por dieta ou paciente…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {filtered.length === 0 && <p style={{ color: "var(--text-soft)" }}>Nenhuma dieta encontrada.</p>}
        {filtered.map(d => {
          const p = patients.find(pp => pp.id === d.patientId);
          const totals = sumMacros(d.meals.flatMap(m => m.items.map(it => {
            const food = foods.find(f => f.id === it.foodId); if (!food) return null;
            const measure = food.measures.find(mm => mm.label === it.measureLabel) || food.measures[0];
            const grams = measure.label.startsWith("g") ? it.qty : it.qty * measure.grams;
            return itemMacros(food, grams);
          }).filter(Boolean)));
          return (
            <Card key={d.id} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div onClick={() => goTo("dietEditor", { dietId: d.id })} style={{ cursor: "pointer" }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{p ? p.name : "Sem paciente"}</div>
                </div>
                <Pill>{Math.round(totals.kcal)} kcal</Pill>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-soft)", marginBottom: 12 }}>{new Date(d.createdAt).toLocaleDateString("pt-BR")} · {d.meals.length} refeições</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Btn size="sm" variant="ghost" icon={Pencil} onClick={() => goTo("dietEditor", { dietId: d.id })}>Editar</Btn>
                <Btn size="sm" variant="ghost" icon={Copy} onClick={() => onDuplicate(d.id)}>Duplicar</Btn>
                <Btn size="sm" variant="danger" icon={Trash2} onClick={() => onDelete(d.id)}>Excluir</Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   PDF / PRINT VIEW
   ============================================================ */
const PrintDiet = ({ diet, patient, foods, nutriName }) => {
  const mealBlocks = diet.meals.map(m => {
    const itemsWithFood = m.items.map(it => ({ item: it, food: foods.find(f => f.id === it.foodId) })).filter(x => x.food);
    const macrosList = itemsWithFood.map(({ item, food }) => {
      const measure = food.measures.find(mm => mm.label === item.measureLabel) || food.measures[0];
      const grams = measure.label.startsWith("g") ? item.qty : item.qty * measure.grams;
      return itemMacros(food, grams);
    });
    return { meal: m, itemsWithFood, totals: sumMacros(macrosList) };
  });
  const dayTotals = sumMacros(mealBlocks.flatMap(b => b.itemsWithFood.map(({ item, food }) => {
    const measure = food.measures.find(mm => mm.label === item.measureLabel) || food.measures[0];
    const grams = measure.label.startsWith("g") ? item.qty : item.qty * measure.grams;
    return itemMacros(food, grams);
  })));

  return (
    <div id="print-root" style={{
      width: "210mm", minHeight: "297mm", margin: "0 auto", background: "#fff", color: "#1A1815",
      fontFamily: "Inter, sans-serif", padding: "16mm", fontSize: 12
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #171512", paddingBottom: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 700, color: "#000000" }}>{nutriName || "@hlnutri"}</div>
          <div style={{ fontSize: 11, color: "#6B6459" }}>Plano alimentar personalizado</div>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#ECE7DA", display: "flex", alignItems: "center", justifyContent: "center", color: "#000000", fontWeight: 700, fontFamily: "Fraunces, serif" }}>N</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 18, background: "#FAF9F6", padding: 12, borderRadius: 8 }}>
        <div><div style={{ fontSize: 9.5, color: "#6B6459", textTransform: "uppercase" }}>Paciente</div><div style={{ fontWeight: 700 }}>{patient ? patient.name : "-"}</div></div>
        <div><div style={{ fontSize: 9.5, color: "#6B6459", textTransform: "uppercase" }}>Idade</div><div style={{ fontWeight: 700 }}>{patient ? (calcAge(patient.birthDate) ?? "-") : "-"} anos</div></div>
        <div><div style={{ fontSize: 9.5, color: "#6B6459", textTransform: "uppercase" }}>Peso / Altura</div><div style={{ fontWeight: 700 }}>{patient ? `${patient.weight || "-"}kg / ${patient.height || "-"}cm` : "-"}</div></div>
        <div><div style={{ fontSize: 9.5, color: "#6B6459", textTransform: "uppercase" }}>Data</div><div style={{ fontWeight: 700 }}>{new Date().toLocaleDateString("pt-BR")}</div></div>
      </div>

      <div style={{ fontFamily: "Fraunces, serif", fontSize: 17, fontWeight: 600, marginBottom: 10, color: "#000000" }}>{diet.name}</div>

      {mealBlocks.map(({ meal, itemsWithFood, totals }) => (
        <div key={meal.id} style={{ marginBottom: 14, breakInside: "avoid" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ECE7DA", padding: "6px 10px", borderRadius: "6px 6px 0 0" }}>
            <span style={{ fontWeight: 700, color: "#000000" }}>{meal.name} · {meal.time}</span>
            <span style={{ fontWeight: 700, color: "#000000" }}>{Math.round(totals.kcal)} kcal</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E1D6", borderTop: "none" }}>
            <thead>
              <tr style={{ fontSize: 9.5, color: "#6B6459", textTransform: "uppercase" }}>
                <td style={{ padding: "4px 8px" }}>Alimento</td>
                <td style={{ padding: "4px 8px" }}>Qtd.</td>
                <td style={{ padding: "4px 8px" }}>Peso</td>
                <td style={{ padding: "4px 8px" }}>Kcal</td>
              </tr>
            </thead>
            <tbody>
              {itemsWithFood.map(({ item, food }) => {
                const measure = food.measures.find(mm => mm.label === item.measureLabel) || food.measures[0];
                const grams = measure.label.startsWith("g") ? item.qty : round1(item.qty * measure.grams);
                const macros = itemMacros(food, grams);
                const selectedSubstitutes = (item.substitutes || [])
                  .map(sub => ({ sub, food: foods.find(f => f.id === sub.foodId) }))
                  .filter(x => x.food);
                return (
                  <React.Fragment key={item.id}>
                    <tr style={{ borderTop: "1px solid #EFEBE0", fontSize: 11 }}>
                      <td style={{ padding: "6px 8px", fontWeight: 650 }}>{food.name}</td>
                      <td style={{ padding: "6px 8px" }}>{item.qty} {measure.label}</td>
                      <td style={{ padding: "6px 8px" }}>{round1(grams)}g</td>
                      <td style={{ padding: "6px 8px", fontWeight: 650 }}>{round1(macros.kcal)}</td>
                    </tr>
                    {selectedSubstitutes.length > 0 && (
                      <tr style={{ borderTop: "1px dashed #E5E1D6" }}>
                        <td colSpan={4} style={{ padding: "6px 8px 8px 18px", background: "#F8F6F0" }}>
                          <div style={{ fontSize: 9.5, fontWeight: 800, color: "#171512", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                            Substituições equivalentes
                          </div>
                          <div style={{ display: "grid", gap: 3 }}>
                            {selectedSubstitutes.map(({ sub, food: sf }) => {
                              const subKcal = itemMacros(sf, sub.grams).kcal;
                              return (
                                <div key={sub.foodId} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 10.5, color: "#6B6459" }}>
                                  <span><strong style={{ color: "#000000" }}>{sf.name}</strong> — {round1(sub.grams)}g{sub.householdText ? ` (${sub.householdText})` : ""}</span>
                                  <span style={{ whiteSpace: "nowrap", fontWeight: 700, color: "#171512" }}>{round1(subKcal)} kcal</span>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {itemsWithFood.length === 0 && <tr><td colSpan={4} style={{ padding: 8, color: "#9C9484", fontStyle: "italic" }}>Sem alimentos</td></tr>}
            </tbody>
          </table>
          {meal.notes && <div style={{ fontSize: 10.5, color: "#6B6459", padding: "4px 2px", fontStyle: "italic" }}>Obs: {meal.notes}</div>}
        </div>
      ))}

      <div style={{ marginTop: 20, background: "#000000", color: "#fff", padding: 14, borderRadius: 8, display: "flex", justifyContent: "space-between", breakInside: "avoid" }}>
        <div><div style={{ fontSize: 9.5, opacity: 0.8, textTransform: "uppercase" }}>Total diário</div><div style={{ fontWeight: 700, fontSize: 16 }}>{Math.round(dayTotals.kcal)} kcal</div></div>
        <div><div style={{ fontSize: 9.5, opacity: 0.8, textTransform: "uppercase" }}>Proteínas</div><div style={{ fontWeight: 700 }}>{round1(dayTotals.protein)}g</div></div>
        <div><div style={{ fontSize: 9.5, opacity: 0.8, textTransform: "uppercase" }}>Carboidratos</div><div style={{ fontWeight: 700 }}>{round1(dayTotals.carbs)}g</div></div>
        <div><div style={{ fontSize: 9.5, opacity: 0.8, textTransform: "uppercase" }}>Gorduras</div><div style={{ fontWeight: 700 }}>{round1(dayTotals.fat)}g</div></div>
        <div><div style={{ fontSize: 9.5, opacity: 0.8, textTransform: "uppercase" }}>Fibras</div><div style={{ fontWeight: 700 }}>{round1(dayTotals.fiber)}g</div></div>
      </div>

      {diet.goalNote && (
        <div style={{ marginTop: 14, fontSize: 11, background: "#F4EAD3", padding: 10, borderRadius: 8, color: "#8C6F3F", breakInside: "avoid" }}>
          <strong>Orientações gerais:</strong> {diet.goalNote}
        </div>
      )}

      <div style={{ marginTop: 24, fontSize: 9.5, color: "#9C9484", textAlign: "center", borderTop: "1px solid #E5E1D6", paddingTop: 10 }}>
        Documento gerado por {nutriName || "@hlnutri"} · Plano individualizado, sujeito a reavaliação em consulta de retorno.
      </div>
    </div>
  );
};

/* ============================================================
   LOGIN SCREEN
   ============================================================ */
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (username.trim() === APP_CREDENTIALS.username && password === APP_CREDENTIALS.password) {
      setError("");
      onLogin();
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #FAF9F6 0%, #F3F1EB 55%, #ECE7DA 100%)", padding: 20,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 380 }}>
        <img src={LOGO_SRC} alt="Logo" style={{ width: 88, height: 88, borderRadius: 18, boxShadow: "0 10px 30px rgba(23,21,18,0.18)", marginBottom: 18 }} />
        <div className="npx-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--primary)", marginBottom: 2 }}>@hlnutri</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Acesse sua área de nutrição</div>

        <Card style={{ width: "100%", padding: 26, boxShadow: "0 14px 34px rgba(23,21,18,0.08)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }} onKeyDown={(e) => { if (e.key === "Enter") submit(e); }}>
            <Field label="Usuário">
              <input
                autoFocus
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
              />
            </Field>
            <Field label="Senha">
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  style={{ ...inputStyle, paddingRight: 38 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-soft)", padding: 4, display: "flex" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {error && (
              <div style={{ fontSize: 12.5, color: "var(--danger)", background: "var(--danger-light)", padding: "8px 10px", borderRadius: 8 }}>
                {error}
              </div>
            )}

            <Btn type="button" onClick={submit} variant="primary" icon={Lock} size="lg" style={{ justifyContent: "center", marginTop: 4 }}>
              Entrar
            </Btn>
          </div>
        </Card>

        <div style={{ fontSize: 11.5, color: "var(--text-soft)", marginTop: 20, textAlign: "center", lineHeight: 1.6 }}>
          Acesso restrito ao consultório @hlnutri.<br />Em caso de dúvidas, fale com o administrador do sistema.
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   NAVIGATION SIDEBAR
   ============================================================ */
const NAV_ITEMS = [
  { key: "dashboard", label: "Painel", icon: LayoutDashboard },
  { key: "patients", label: "Pacientes", icon: Users },
  { key: "foods", label: "Alimentos", icon: Apple },
  { key: "diets", label: "Dietas salvas", icon: ClipboardList },
];

const Sidebar = ({ view, goTo, onLogout }) => (
  <div className="no-print" style={{ width: 208, flexShrink: 0, borderRight: "1px solid var(--border)", padding: "22px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px", marginBottom: 22 }}>
      <img src={LOGO_SRC} alt="Logo" style={{ width: 32, height: 32, borderRadius: 8, boxShadow: "0 2px 8px rgba(23,21,18,0.2)" }} />
      <span className="npx-display" style={{ fontWeight: 700, fontSize: 17, color: "var(--primary-dark)" }}>@hlnutri</span>
    </div>
    {NAV_ITEMS.map(item => {
      const active = view === item.key || (item.key === "patients" && view === "patientDetail") || (item.key === "diets" && view === "dietEditor");
      return (
        <button key={item.key} onClick={() => goTo(item.key)}
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none",
            background: active ? "var(--primary-light)" : "transparent", color: active ? "var(--primary-dark)" : "var(--text-muted)",
            fontWeight: active ? 700 : 600, fontSize: 13.5, textAlign: "left"
          }}>
          <item.icon size={16} /> {item.label}
        </button>
      );
    })}
    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
      <button onClick={onLogout}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border)",
          background: "var(--surface)", color: "var(--text-muted)", fontWeight: 600, fontSize: 13.5, textAlign: "left"
        }}>
        <LogOut size={16} /> Sair
      </button>
      <div style={{ padding: "4px 8px", fontSize: 11, color: "var(--text-soft)", lineHeight: 1.5 }}>
        Estrutura pronta para banco de dados e app mobile.
      </div>
    </div>
  </div>
);

/* ============================================================
   ROOT APP
   ============================================================ */
export default function NutriPlanner() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("dashboard");
  const [patients, setPatients] = useState(SEED_PATIENTS);
  const [foods, setFoods] = useState(SEED_FOODS);
  const [diets, setDiets] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedDietId, setSelectedDietId] = useState(null);
  const [draftDiet, setDraftDiet] = useState(null); // working copy while editing
  const [printMode, setPrintMode] = useState(false);
  const printRef = useRef(null);

  const goTo = useCallback((nextView, params = {}) => {
    if (nextView === "dietEditor") {
      if (params.dietId) {
        const d = diets.find(x => x.id === params.dietId);
        setDraftDiet(d ? { ...d } : newDiet(params.patientId || null));
        setSelectedDietId(params.dietId);
      } else {
        setDraftDiet(newDiet(params.patientId || null));
        setSelectedDietId(null);
      }
    }
    if (nextView === "patientDetail" && params.patientId) setSelectedPatientId(params.patientId);
    setView(nextView);
    window.scrollTo({ top: 0 });
  }, [diets]);

  const saveDraftDiet = () => {
    if (!draftDiet) return;
    // bump food usage counts
    const usedFoodIds = draftDiet.meals.flatMap(m => m.items.map(i => i.foodId));
    setFoods(fs => fs.map(f => usedFoodIds.includes(f.id) ? { ...f, usageCount: f.usageCount + usedFoodIds.filter(id => id === f.id).length } : f));

    if (selectedDietId) {
      setDiets(ds => ds.map(d => d.id === selectedDietId ? draftDiet : d));
    } else {
      const saved = { ...draftDiet, id: draftDiet.id };
      setDiets(ds => [...ds, saved]);
      setSelectedDietId(saved.id);
    }
  };

  const deleteDiet = (id) => { setDiets(ds => ds.filter(d => d.id !== id)); };
  const duplicateDiet = (id) => {
    const d = diets.find(x => x.id === id);
    if (!d) return;
    const copy = { ...d, id: uid("diet_"), name: d.name + " (cópia)", createdAt: new Date().toISOString(), meals: d.meals.map(m => ({ ...m, id: uid("meal_"), items: m.items.map(it => ({ ...it, id: uid("it_") })) })) };
    setDiets(ds => [...ds, copy]);
  };

  const exportPdf = () => {
    saveDraftDiet();
    setPrintMode(true);
    // Aguarda a visualização A4 ser renderizada antes de abrir a janela de impressão.
    // No navegador, escolha “Salvar como PDF” como destino.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        setTimeout(() => setPrintMode(false), 500);
      });
    });
  };

  const currentPatient = patients.find(p => p.id === selectedPatientId);
  const printPatient = draftDiet ? patients.find(p => p.id === draftDiet.patientId) : null;

  if (!authed) {
    return (
      <div className="npx">
        <GlobalStyle />
        <LoginScreen onLogin={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="npx">
      <GlobalStyle />
      {printMode && draftDiet ? (
        <PrintDiet diet={draftDiet} patient={printPatient} foods={foods} nutriName="@hlnutri" />
      ) : (
        <div style={{ display: "flex", maxWidth: 1240, margin: "0 auto" }}>
          <Sidebar view={view} goTo={goTo} onLogout={() => setAuthed(false)} />
          <div style={{ flex: 1, padding: "26px 32px", minWidth: 0 }}>
            {view === "dashboard" && <Dashboard patients={patients} diets={diets} foods={foods} goTo={goTo} />}
            {view === "patients" && <PatientsView patients={patients} diets={diets} setPatients={setPatients} goTo={goTo} />}
            {view === "patientDetail" && (
              <PatientDetailView patient={currentPatient} diets={diets} foods={foods} goTo={goTo}
                onDeleteDiet={deleteDiet} onDuplicateDiet={duplicateDiet} />
            )}
            {view === "foods" && <FoodsView foods={foods} setFoods={setFoods} />}
            {view === "diets" && <DietsView diets={diets} patients={patients} foods={foods} goTo={goTo} onDelete={deleteDiet} onDuplicate={duplicateDiet} />}
            {view === "dietEditor" && (
              <DietEditorView diet={draftDiet} patients={patients} foods={foods} setFoods={setFoods}
                onChangeDiet={setDraftDiet} goTo={goTo} onSave={saveDraftDiet} onExportPdf={exportPdf} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
