# 과제

#1 (a) What is the resistivity $\rho$ of silicon doped with $10^{17}cm^{-3}$ of arsenic?
(b) What is the resistance $R$ of a piece of this silicon material $1\mu m$ long and 0.1 $\mu m^2$ in cross-sectional area?

$$
\rho = \dfrac{1}{q \cdot n \cdot \mu}
= \dfrac{1}{(1.602 \cdot 10^{-19}C) \cdot (10^{17}cm^{-3}) \cdot (1350cm^2/V \cdot s)}
= 46.239
$$

$$
R = \rho \dfrac{L}{A} = (46.239) \dfrac{1\mu}{0.1\mu} = 462.39
$$

#2 Given $\mu_p = 470 cm^2/V \cdot s$ , what is the hole drift velocity at $\textbf{E} = 10^3 V/cm$ ? What is $t_{mp}$ and what is the distance traveled between collisions (called the mean free path)? Hint: When in dout, us the MKS system of units.

$$
v = \mu_p \cdot E = (470cm^2/V \cdot s)(10^3V/cm) = 4.7 \cdot 10^3 m/s
$$

$$
t_{mp} = \dfrac{\mu_p m_p}{q} = \dfrac{(470 cm^2/V \cdot s)(0.39 \cdot 9.1 \cdot 10^{-31}kg)}{1.602 \cdot 10^{-19} C}
= 1.041 ps
$$

mean free path

$$
v \cdot t_{mp} = 4.7 \mu m
$$

#3 For Si at room temperature, calculate the following quantities. (Numerical answers required, and don't forget to include units with your answer.)
(a) The density of states in the conduction band, $g_c(E)$ , at an energy 26meV above $E_c$
(b) The density of states in the valence band, $g_v(E)$ , ate an energy 26meV below $E_v$

$$
g_c(E) = D_c(E) = \dfrac{8\pi m_n \sqrt{2m_n(E - E_c)}}{h^3}
= \dfrac{8\pi(0.26 \cdot 9.109 \cdot 10^{-31}kg)\sqrt{2(0.26 \cdot 9.109 \cdot 10^{-31}kg)(26meV)}}{(1.055 \cdot 10^{-34} J \cdot s)^3}
= 2.27 \cdot 10^{54}
$$

$$
g_v(E) = D_v(E) = \dfrac{8\pi m_p \sqrt{2m_p(E_v - E)}}{h^3}
= \dfrac{8\pi (0.39 \times 9.109 \cdot 10^{-31}kg) \sqrt{2(0.39 \times 9.109 \cdot 10^{-31}kg)(26meV)}}{(1.055 \cdot 10^{-34} J \cdot s)^3}
= 730.76 \cdot 10^{54}
$$

ㅏㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ#4 Find the resistance of an intrinsic germanium rod 1cm long, 1mm wide and 1mm thick at 300K. For germanium $n_i = 2.5 \times 10^{19} m^{-3} ; \mu_e = 0.39m^2V^{-1}S^{-1}$ and $\mu_h = 0.19 m^2 V^{-1} S^{-1}$

$$
R = \rho \dfrac{L}{A}
= \dfrac{1}{q \cdot n_i \cdot (\mu_e + \mu_h)} \dfrac{L}{A}
= \dfrac{1cm}{(1.602 \cdot 10^{-19}C)(2.5 \times 10^{19} m^{-3})(0.39m^2V^{-1}S^{-1} + 0.19 m^2 V^{-1} S^{-1})(1mm^2)}
$$

#5 A silicon material is uniformly doped with phosphorus atoms at a concentration of $2 \times 10^{-19}m^{-3}$. The Mobilties of electrons and holes are 0.05 and 0.12 $m^2 V^{-1} S^{-1}$ respectively. $N_i = 1.5 \times 10^{16}m^3$ . Find the electron and hole concentration and its electrical conductivity.

$$
n = 2 \times 10^{19} m^{-3}
\\
p = \dfrac{n_i^2}{n}
=\dfrac{(10^{10}cm^{-3})^2}{2 \times 10^{19} m^{-3}} = 
$$

$$
\sigma = \dfrac{1}{\rho} = q \cdot (n\mu_n + p\mu_p) = (1.602 \cdot 10^{-19}C)(((n = 2 \times 10^{19} m^{-3})(0.05m^2/V \cdot s) + p\mu_p))
$$

#6 For an intrinsic semiconductor with a band gap of $0.7eV$, determine the position of $E_F$ at T = 300K if effective mass of hole = 6 times of effective mass of electron.

#7 A semiconductor has a mobility of $500cm^2 V^{-1} S^{-1}$ at $T = 300K$ . Calculate the diffusion coefficient.

$$
D_n = \dfrac{kT}{q}\mu_n = \dfrac{(1.38 \cdot 10^{-23}J/K)(300K)}{1.602 \cdot 10^{-19}C}(500cm^2 V^{-1} S^{-1})
= 12.92cm^2/C
$$
